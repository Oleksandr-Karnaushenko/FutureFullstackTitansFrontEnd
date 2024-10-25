import { Formik, Form } from 'formik';
import css from './DailyNormaModal.module.css';
import Backdrop from '../Backdrop/Backdrop';

export default function DailyNormaModal({ isOpen, onClose }) {
  return (
    <>
      <Backdrop show={isOpen} onClick={onClose} />
      <div className={css.modalOverlay}>
        <Formik
          initialValues={{}}
          onSubmit={values => {
            // Submit form values, you can handle it accordingly
            onClose(); // Close modal after form submission
          }}
        >
          <Form>
            <div className={css.modalWrap}>
              <div className={css.ratioWrap}>
                <button className={css.closeBtn} onClick={onClose}>
                  X
                </button>
                <h2 className={css.modalTitle}>My daily norma</h2>
                <div className={css.womanManRatio}>
                  <p className={css.modalText}>
                    For girl: <span>V=(M*0,03) + (T*0,4)</span>
                  </p>
                  <p className={css.modalText}>
                    For man: <span>V=(M*0,04) + (T*0,6)</span>
                  </p>
                </div>
                <p className={css.modalTextSmall}>
                  <span>*</span>V is the volume of the water norm in liters per
                  day, M is your body weight, T is the time of active sports, or
                  another type of activity commensurate in terms of loads (in
                  the absence of these, you must set 0)
                </p>
              </div>
              <div className={css.calculateWrap}>
                <h3 className={css.modalTitleSec}>Calculate your rate:</h3>
                <div className={css.chooseGenderWrap}>
                  <label>
                    <input type="radio" name="gender" value="woman" />
                    For woman
                  </label>
                  <label>
                    <input type="radio" name="gender" value="man" />
                    For man
                  </label>
                </div>
                <div>
                  <p className={css.modalText}>Your weight in kilograms:</p>
                  <input
                    className={css.input}
                    id="weight"
                    name="weight"
                    type="number"
                  />
                </div>
                <div>
                  <p className={css.modalText}>
                    The time of active participation in sports or other
                    activities with a high physical. load in hours:
                  </p>
                  <input
                    className={css.input}
                    id="weight"
                    name="weight"
                    type="number"
                  />
                </div>
                <div className="">
                  <p className={css.modalText}>
                    The required amount of water in liters per day:
                  </p>
                  <strong>1.8L</strong>
                </div>
              </div>
              <div className={css.writeDownWrap}>
                <h3 className={css.modalTitleSec}>
                  Write down how much water you will drink:
                </h3>
                <input
                  className={css.input}
                  id="weight"
                  name="weight"
                  type="number"
                />
              </div>
            </div>
            <button className={css.btn} type="submit">
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
