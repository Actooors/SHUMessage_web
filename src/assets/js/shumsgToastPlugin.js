import {ToastPlugin} from 'vux'

const plugin = {
  install(vue) {
    ToastPlugin.install(vue);
    Object.defineProperty(vue.prototype, '$toast', {
      value({text, width, type = 'success', position = 'top', time = 2000, emoji = false} = {}) {
        const TypeToClassMap = {
          success: 'toast-greenStyle',
          warning: 'toast-yellowStyle',
          error: 'toast-redStyle'
        };
        const TypeToEmojiPathMap = {
          success: '/static/smile.png',
          warning: '/static/cry.png',
          error: '/static/bigCry.png'
        };
        const TypeToEmojiSize = {
          success: 24,
          warning: 18,
          error: 18
        };
        const TypeToTextMargin = {
          success: '0',
          warning: '2px',
          error: '2px'
        };
        vue.$vux.toast.show({
          text: `<div class="${TypeToClassMap[type]}">${emoji ? `<img height="${TypeToEmojiSize[type]}" src="${TypeToEmojiPathMap[type]}">` : ''}<span style="margin-left:${TypeToTextMargin[type]}">${text}</span></div>`,
          width,
          type: 'text',
          position,
          time
        });
      }
    });
  }
};
export default plugin
export const install = plugin.install
