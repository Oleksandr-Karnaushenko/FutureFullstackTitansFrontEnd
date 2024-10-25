import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import * as selector from '../../redux/water/waterSelectors';
import { deleteWaterAPI } from '../../redux/water/waterOperation/';
import Icon from '../Icon/Icon';
import { TodayWaterModal } from '../TodayWaterModal/TodayWaterModal';
import { ButtonBtn } from '../ButtonBtn/ButtonBtn';
import {
  getCurrentDayInfoAPI,
  editWaterAPI,
} from '../../redux/water/waterOperation/';
import css from './TodayWaterListItem.module.css';

import TodayListModal from '../TodayListModal/TodayListModal';
import { TodayWaterBackdrop } from '../TodayWaterBackdrop/TodayWaterBackdrop';

let waterObj = {
  _id: '671a49a0ad47789dfc91b190',
  waterVolume: 550,
  time: '10:50',
};
// let waterObj ={

// };

export const TodayWaterListItem = ({ waterItem }) => {
  const { waterVolume, time, _id } = waterItem;

  const dispatch = useDispatch();
  useSelector(selector.selectDayInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    return setIsModalOpen(!isModalOpen);
  };

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const toggleModalEdit = () => {
    return setIsModalOpenEdit(!isModalOpenEdit);
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteWaterAPI(_id));
      toggleModal();
      await dispatch(getCurrentDayInfoAPI());
      toast.success('Entry deleted successfully!', { duration: 4000 });
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete the entry.');
    }
  };

  const handleEditClick = async () => {
    waterObj = {
      _id,
      waterVolume,
      time,
    };

    toggleModalEdit();
  };

  const waterVolumeLiter =
    waterVolume >= 1000 ? `${waterVolume / 1000} L` : `${waterVolume} ml`;

  return (
    <div className={css.todayWaterListItemContainer}>
      <div className={css.todayWaterListItemValueContainer}>
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
          onClick={handleEditClick}
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
          clasNameBtn={css.buttonModalDelete}
          icon={null}
          name={'Delete'}
          type={'button'}
          onClick={handleDeleteClick}
        />
        <ButtonBtn
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
          type={'button'}
          onClick={toggleModal}
        />
      </TodayWaterModal>

      <TodayWaterBackdrop isOpen={isModalOpenEdit} onClose={toggleModalEdit}>
        <TodayListModal waterObj={waterObj} onClose={toggleModalEdit} />
      </TodayWaterBackdrop>

      <Toaster />
    </div>
  );
};
