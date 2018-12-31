/*
* 当进入的路由页面中包含that组件时，函数返回真，否则返回假。
* */
function isRouteEnter(that, to) {
  function dfs(instance) {
    if (!instance.$children.length) {
      return false;
    }
    for (let child of instance.$children) {
      if (child.$options.name === that.$options.name) {
        return true;
      }
      let ok = dfs(child);
      if (ok) {
        return true;
      }
    }
    return false;
  }

  let instance = to.matched[to.matched.length - 1].instances.default;
  return instance && that && (instance.$options.name === that.$options.name || dfs(instance));
}

export {isRouteEnter};
