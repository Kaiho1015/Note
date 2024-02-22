// 引入 React 库和必要的钩子函数
import React, { useEffect, useState, useRef } from "react";
// 引入 ReactDOM 用于创建 portal
import ReactDOM from "react-dom";
// 引入 usePopper 钩子，用于定位 popper 元素
import { usePopper } from "react-popper";
// 引入 CSS 模块化样式
import styles from "./styles.module.css";

// 定义 Tooltip 组件的 props 类型
interface Props {
  anchorEl?: HTMLElement | string; // 锚点元素或选择器
  id: string; // Tooltip 的唯一标识符
  text: string; // Tooltip 文本内容
  delay?: number; // 显示 Tooltip 的延迟时间（毫秒）
  children: React.ReactElement; // 唯一的子元素，Tooltip 将基于此元素定位
}

// Tooltip 组件定义
export default function Tooltip({ children, id, anchorEl, text, delay }: Props): JSX.Element {
  // 状态和引用
  const [open, setOpen] = useState(false); // 控制 Tooltip 的显示状态
  const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null); // 参考元素（触发 Tooltip 显示的元素）
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null); // Popper 元素（Tooltip 本身）
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null); // Tooltip 箭头元素
  const [container, setContainer] = useState<Element | null>(null); // Tooltip 将被渲染到的容器
  const { styles: popperStyles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      // 配置箭头和偏移量
      { name: "arrow", options: { element: arrowElement } },
      { name: "offset", options: { offset: [0, 8] } },
    ],
  });

  const timeout = useRef<number | null>(null); // 用于控制延迟显示的定时器
  const tooltipId = `${id}_tooltip`; // 构建 Tooltip 的 ID

  // 用于设置 Tooltip 容器的副作用
  useEffect(() => {
    if (anchorEl) {
      if (typeof anchorEl === "string") {
        // 如果 anchorEl 是选择器字符串，则查询对应元素
        setContainer(document.querySelector(anchorEl));
      } else {
        // 如果 anchorEl 是 HTMLElement，则直接使用
        setContainer(anchorEl);
      }
    } else {
      // 默认将 body 作为容器
      setContainer(document.body);
    }
  }, [container, anchorEl]);

  // 控制 Tooltip 显示和隐藏的副作用
  useEffect(() => {
    const showEvents = ["mouseenter", "focus"]; // 触发显示的事件
    const hideEvents = ["mouseleave", "blur"]; // 触发隐藏的事件

    const handleOpen = () => {
      if (text === "") return; // 如果 Tooltip 文本为空，则不显示

      referenceElement?.removeAttribute("title"); // 移除 title 属性，避免原生 Tooltip 显示

      timeout.current = window.setTimeout(() => {
        setOpen(true); // 延迟后显示 Tooltip
      }, delay || 300); // 默认延迟 300ms
    };

    const handleClose = () => {
      clearInterval(timeout.current!);
      setOpen(false); // 隐藏 Tooltip
    };

    // 给参考元素添加事件监听器
    if (referenceElement) {
      showEvents.forEach(event => referenceElement.addEventListener(event, handleOpen));
      hideEvents.forEach(event => referenceElement.addEventListener(event, handleClose));
    }

    // 清理事件监听器
    return () => {
      if (referenceElement) {
        showEvents.forEach(event => referenceElement.removeEventListener(event, handleOpen));
        hideEvents.forEach(event => referenceElement.removeEventListener(event, handleClose));
      }
    };
  }, [referenceElement, text, delay]);

  return (
    <>
      {React.cloneElement(children, {
        ref: setReferenceElement, // 设置参考元素
        "aria-describedby": open ? tooltipId : undefined, // 辅助技术属性
      })}
      {container &&
        ReactDOM.createPortal(
          open && (
            <div
              id={tooltipId}
              role='tooltip'
              ref={setPopperElement} // 设置 Popper 元素
              className={styles.tooltip} // 应用样式
              style={popperStyles.popper} // 应用由 Popper.js 生成的样式
              {...attributes.popper} // 应用 Popper.js 的属性
            >
              {text}
              <span
                ref={setArrowElement} // 设置箭头元素
                className={styles.tooltipArrow}
                style={popperStyles.arrow} // 应用箭头的样式
              />
            </div>
          ),
          container
        )}
    </>
  );
}
