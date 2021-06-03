import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export function showSweet(type, title, message) {
  MySwal.fire({
    customClass: {
      container: 'my-swal'
    },
    icon: type,
    title,
    text: message,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500
  })
}


export default MySwal