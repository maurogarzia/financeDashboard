import Swal from "sweetalert2"

export const SuccesAlert = (title: string, subtitle? : string) => {
    Swal.fire({
        icon: 'success',
        title: title,
        text: subtitle
    })
}