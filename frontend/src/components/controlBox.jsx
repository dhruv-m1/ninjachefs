
export default function ControlBox() {


    const openModal = () => {
        window.scrollTo({ top: 0, left: 0});
        document.querySelector('.add-item-modal-wrapper').style.display = 'unset';
        document.querySelector('body').style.overflowY = 'hidden';
    }

    return (
        <div className="controls-box">
            <h1>Sharing is caring.</h1>
            <button type="button" onClick={openModal}>Add Recipe</button>
        </div>
    );
  }