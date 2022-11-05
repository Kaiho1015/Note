/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  JavaScript: [
    {
      type: 'html',
      value: 'JavaScript',
      className: 'sidebar-title',
    },
    doc("JavaScript/JS词法结构", "JS词法结构"),
    category("JavaScript/JS类型", "JS类型", [
      category("JavaScript/JS类型/基本数据类型", "基本数据类型", [
        doc("JavaScript/JS类型/基本数据类型/Number", "Number"),
        doc("JavaScript/JS类型/基本数据类型/String", "String"),
        doc("JavaScript/JS类型/基本数据类型/Boolean", "Boolean"),
        doc("JavaScript/JS类型/基本数据类型/null与undefined", "null与undefined"),
        doc("JavaScript/JS类型/基本数据类型/Symbol", "Symbol"),
      ]),
      doc("JavaScript/JS类型/类型转换", "类型转换"),
      doc("JavaScript/JS类型/对象引用", "对象引用"),
      doc("JavaScript/JS类型/解构赋值", "解构赋值"),
    ]),
    doc("JavaScript/JS表达式与操作符", "JS表达式与操作符"),
    doc("JavaScript/JS语句", "JS语句"),
    doc("JavaScript/JS对象", "JS对象"),
    doc("JavaScript/JS数组", "JS数组"),
    category("JavaScript/JS函数", "JS函数", [
      doc("JavaScript/JS函数/函数定义", "函数定义"),
      doc("JavaScript/JS函数/函数调用", "函数调用"),
      doc("JavaScript/JS函数/形参与实参", "形参与实参"),
      doc("JavaScript/JS函数/作为值或命名空间", "作为值或命名空间"),
      doc("JavaScript/JS函数/闭包", "闭包"),
      doc("JavaScript/JS函数/属性和方法", "属性和方法"),
      doc("JavaScript/JS函数/函数式编程", "函数式编程"),
    ]),
    doc("JavaScript/JS类", "JS类"),
    doc("JavaScript/JS模块", "JS模块"),
    doc("JavaScript/JS迭代器与生成器", "JS迭代器与生成器"),
    category("JavaScript/JS异步", "JS异步", [
      doc("JavaScript/JS异步/回调函数", "回调函数"),
      doc("JavaScript/JS异步/Promise", "Promise"),
      doc("JavaScript/JS异步/async和await", "async和await"),
      doc("JavaScript/JS异步/异步迭代", "异步迭代"),
    ]),
    // doc("JavaScript/JS异步", "JS异步"),
  ],

  Network: [
    {
      type: 'html',
      value: '计算机网络',
      className: 'sidebar-title',
    },
    doc("Network/计算机网络/计算机网络和因特网", "计算机网络和因特网"),
    category("Network/计算机网络/应用层", "应用层", [
      doc("Network/计算机网络/应用层/1", "应用层协议原理"),
      doc("Network/计算机网络/应用层/2", "Web和HTTP"),
      doc("Network/计算机网络/应用层/3", "FTP"),
      doc("Network/计算机网络/应用层/4", "E-mail"),
      doc("Network/计算机网络/应用层/5", "DNS"),
      doc("Network/计算机网络/应用层/6", "CDN"),
      doc("Network/计算机网络/应用层/7", "Socket"),
    ]),
    category("Network/计算机网络/传输层", "传输层", [
      doc("Network/计算机网络/传输层/1", "概述"),
      doc("Network/计算机网络/传输层/2", "多路复用&解复用"),
      doc("Network/计算机网络/传输层/3", "无连接传输：UDP"),
      doc("Network/计算机网络/传输层/4", "RDT原理"),
      doc("Network/计算机网络/传输层/5", "面向连接的传输：TCP"),
      doc("Network/计算机网络/传输层/6", "拥塞控制原理"),
      doc("Network/计算机网络/传输层/7", "TCP拥塞控制"),
    ]),
    doc("Network/计算机网络/网络层：控制平面", "网络层：控制平面"),
    doc("Network/计算机网络/网络层：数据平面", "网络层：数据平面"),
    doc("Network/计算机网络/链路层和局域网", "链路层和局域网"),
  ]
};


function doc(id, label) {
  return {
    type: "doc",
    id: id,
    label: label,
  };
}

function category(id, label, items) {
  return {
    type: "category",
    label: label,
    collapsible: true,
    collapsed: true,
    link: {
      // type: "doc",
      id: id,
    },
    items: items,
  };
}
module.exports = sidebars;
