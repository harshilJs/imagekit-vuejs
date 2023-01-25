import IKContext from "./components/IKContext.vue";
import IKImage from "./components/IKImage.vue";
import IKUpload from "./components/IKUpload.vue";
import IKVideo  from "./components/IKVideo.vue";
import ImageKit from 'imagekit-javascript';
export const VERSION = "1.0.9";

const componentMapping = {
  "ik-context": IKContext,
  "ik-image": IKImage,
  "ik-upload": IKUpload,
  "ik-video": IKVideo,
};

export function install(Vue, options) {
  if (Vue.IkInstalled) {
    throw new Error("Imagekit plugin already installed");
  }

  options.defaultOptions = {
    sdkVersion: `vuejs-${VERSION}`,
    publicKey: options.publicKey,
    urlEndpoint: options.urlEndpoint,
    authenticationEndpoint: options.authenticationEndpoint
  };

  options.IkClient = new ImageKit(options.defaultOptions)

  Vue.IkInstalled = true;

  initComponents(Vue, options);
}

function initComponents(Vue, options) {
  for (var i = 0; i < options.components.length; i++) {
    let componentName = options.components[i];
    const component = componentMapping[componentName];
    if (component) {
      Vue.component(componentName, {
        ...component,
        data() {
          return {
            ...(component.data ? component.data() : {}),
            IkClient: options.IkClient,
            defaultOptions : options.defaultOptions
          }
        }
      })
    }
  }
}
