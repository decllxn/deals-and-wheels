// components/CustomUploadPlugin.js
import CustomUploadAdapter from './CustomUploadAdapter';

export function CustomUploadPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new CustomUploadAdapter(loader);
  };
}