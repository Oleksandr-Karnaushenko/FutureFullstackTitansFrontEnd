import { useState } from 'react';
import Icon from '../Icon/Icon';
import { TodayWaterModal } from '../TodayWaterModal/TodayWaterModal';
import { ButtonBtn } from '../ButtonBtn/ButtonBtn';

import css from './TodayWaterListItem.module.css';

export const TodayWaterListItem = ({ waterItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    return setIsModalOpen(!isModalOpen);
  };

  // const closeModal = ()=>{
  //   setIsModalOpen(false);
  // }

  const { waterVolume, time } = waterItem;
  // const time = date.split('T')[1];
  const waterVolumeLiter =
    waterVolume >= 1000 ? `${waterVolume / 1000} L` : `${waterVolume} ml`;

  return (
    <div className={css.todayWaterListItemContainer}>
      <div className={css.todayWaterListItemValueContainer}>
        {/* <ReactSVG src={svgIcon} className={css.todayWaterListItemValueIcon} /> */}

        <Icon name={'glass'} className={css.todayWaterListItemValueIconNew} />

        <span className={css.todayWaterListItemValueLiter}>
          {waterVolumeLiter}
        </span>
        <span className={css.todayWaterListItemValueTime}> {time}</span>
      </div>
      <div className={css.todayWaterListItemButtonsContainer}>
        <ButtonBtn
          type={'submit'}
          clasNameBtn={css.buttonBtnEdit}
          classNameBtnIcon={css.buttonBtnEditIcon}
          icon={'notebook'}
          onClick={() => {
            // console.log('111111');
          }}
        />
        <ButtonBtn
          type={'submit'}
          clasNameBtn={css.buttonBtnDelete}
          classNameBtnIcon={css.buttonBtnDeleteIcon}
          icon={'trashbox'}
          onClick={toggleModal}
        />
      </div>

      <TodayWaterModal
        title="Delete entry"
        text="Are you sure you want to delete the entry?"
        isOpen={isModalOpen}
        onClose={toggleModal}
      >
        <ButtonBtn
          // classNameBtnIcon={css.buttonSubmitAddIcon}
          clasNameBtn={css.buttonModalDelete}
          icon={null}
          name={'Delete'}
          type={'button'}
          // onClick={toggleModal}
        />

        <ButtonBtn
          // classNameBtnIcon={css.buttonSubmitAddIcon}
          clasNameBtn={css.buttonModalCancel}
          icon={null}
          name={'Cancel'}
          type={'button'}
          onClick={toggleModal}
        />

        <ButtonBtn
          classNameBtnIcon={css.buttonModalIcon}
          clasNameBtn={css.buttonModalClose}
          icon={'cross'}
          // name={'Close'}
          type={'button'}
          onClick={toggleModal}
        />
      </TodayWaterModal>
    </div>
  );
};

//
