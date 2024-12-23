document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('myModal');
    const modalBody = document.getElementById('modal-body');
    const span = document.getElementsByClassName('close')[0];
    const elements = document.getElementsByClassName('fullscreen_able');

    Array.from(elements).forEach(element => {
        element.addEventListener('click', function () {
            modalBody.innerHTML = this.innerHTML;
            modal.style.display = 'flex';
        });
    });

    span.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});