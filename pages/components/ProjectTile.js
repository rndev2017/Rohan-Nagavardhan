import styles from './ProjectTile.module.css'
import React from "react";
import Modal from './Modal';

export default function ProjectTile(props) {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
          <div onClick={() => setShowModal(true)} className={styles.tile}>
                <img className={styles.thumbnail} src={props.project.thumbnail} />
                {/* overlay */}
                <div className={styles.overlay}>
                    <div className="flex flex-col justify-between">
                        <div className="p-2">
                            <p className="lg:text-lg md:text text-sm font-medium tracking-wide py-2">{props.project.org}</p>
                            <p className="lg:text-5xl md:text-3xl text-2xl font-bold tracking-wide">{props.project.name}</p>
                        </div>
                    </div>
                </div>
            </div>
          {showModal ? (
            <>
                <Modal data={props.project} close={setShowModal} />
                <div className="opacity-25 fixed inset-0 z-40 bg-gray-800"></div>
            </>
          ) : null}
        </>
    )
}