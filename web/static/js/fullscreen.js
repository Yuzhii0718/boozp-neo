document.addEventListener('DOMContentLoaded', function () {
    let modal = document.getElementById('myModal');
    let modalBody = document.getElementById('modal-body');
    let span = document.getElementsByClassName('close')[0];
    let elements = document.getElementsByClassName('fullscreen_able');

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