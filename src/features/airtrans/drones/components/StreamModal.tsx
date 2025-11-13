/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import "../styles/streamModalStyle.scss";
type Props = {
     open: boolean;
     title?: string;
     iframeSrc?: string | null;
     onClose: () => void;
};

export default function StreamModal({ open, title = "Live stream", iframeSrc, onClose }: Props) {
     React.useEffect(() => {
          if (!open) return;
          const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
          window.addEventListener("keydown", onKey);
          return () => window.removeEventListener("keydown", onKey);
     }, [open, onClose]);

     if (!open || !iframeSrc) return null;

     return (
          <div className="modal-overlay" onClick={onClose}>
               <div
                    className="modal-card"
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => e.stopPropagation()}
               >
                    <div className="modal-header">
                         <h4 className="modal-title">{title}</h4>
                         <button className="modal-close" onClick={onClose} aria-label="Close">
                              x
                         </button>
                    </div>
                    <div className="modal-body">
                         <div className="iframe-wrap">
                              <iframe
                                   key={iframeSrc}
                                   src={iframeSrc}
                                   title="Drone Stream"
                                   width="100%"
                                   height="100%"
                                   allow="autoplay; fullscreen"
                                   allowFullScreen
                                   referrerPolicy="no-referrer"
                                   style={{ border: 0, display: "block" }}
                              />
                         </div>
                    </div>
                    <div className="modal-footer">
                         <a className="secondary-btn" href={iframeSrc} rel="noreferrer" target="_blank">
                              Mo trong tab moi
                         </a>
                    </div>
               </div>
          </div>
     );
}
