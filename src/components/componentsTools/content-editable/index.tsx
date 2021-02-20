import React, { CSSProperties } from 'react';
import classNames from 'classnames';

type ContentEditableProps = {
  /** HTML文本内容 */
  html: string;
  /** 类名 */
  className?: string;
  /** 样式 */
  style?: CSSProperties;
  /** value类型 */
  valueType?: string;
  /** 内容更新时调用 */
  onChange?: (params: any) => void;
};

/** 内容可编辑组件 */
class ContentEditable extends React.Component<ContentEditableProps> {
  static defaultProps = {
    valueType: 'text',
  };
  shouldComponentUpdate(nextProps: ContentEditableProps) {
    return !!this.domNode && nextProps.html !== this.domNode.innerHTML;
  }
  componentDidUpdate() {
    // 初始化
    const domNode = this.domNode;
    const html = this.props.html;
    if (html && !!domNode && html !== domNode.innerHTML) {
      domNode.innerHTML = html;
    }
  }
  domNode: HTMLDivElement | null | undefined;
  lastHtml: string | undefined;
  emitChange = () => {
    const { valueType } = this.props;
    const html = valueType === 'text' ? this.domNode!.innerText : this.domNode!.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html,
        },
      });
    }
    this.lastHtml = html;
  };
  render() {
    const { className, style, html } = this.props;
    return (
      <div
        ref={dom => (this.domNode = dom)}
        onInput={this.emitChange}
        onBlur={this.emitChange}
        contentEditable
        dangerouslySetInnerHTML={{ __html: html }}
        className={classNames('rac_contenteditable', className)}
        {...{ style }}
      />
    );
  }
}

export default ContentEditable;
