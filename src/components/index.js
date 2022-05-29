
import UploadExcel from './uploadExcel'
import ImageUpload from './ImageUpload'

export default {
  install (Vue) {
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload',ImageUpload)
  }
}

// Vue.use()