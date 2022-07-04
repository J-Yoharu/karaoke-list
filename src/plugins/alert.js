import Swal from 'sweetalert2'
import Vue from 'vue'

// Swal
Vue.prototype.$alert = {
  delete(callback, options = {}) {
    Swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: 'Uma vez deletado não poderá recuperar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d9003c',
      confirmButtonText: 'Sim, concluir!',
      cancelButtonText: 'Cancelar',
      ...options,
    }).then(result => {
      if (result.value) {
        callback()
      }
    })
  },
  confirm(callback, options = {}) {
    const defaultOptions = {
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, Continuar!',
    }
    Swal.fire({
      ...defaultOptions,
      ...options,
    }).then(result => {
      if (result.value) callback()
    })
  },
}

//Toast
const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  showCloseButton: true,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

const toasts = {
  success: title => {
    Toast.fire({
      icon: 'success',
      title: title,
      background: '#deffe3',
    })
  },
  error: title => {
    Toast.fire({
      icon: 'error',
      title: title,
      background: '#fce3e3',
      customClass: {
        closeButton: 'closeButtonCollor',
      },
    })
  },
}
Vue.prototype.$toast = toasts
export default toasts
