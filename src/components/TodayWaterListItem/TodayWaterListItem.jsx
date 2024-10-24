import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

import * as selector from '../../redux/water/waterSelectors';
import { deleteWaterAPI } from '../../redux/water/waterOperation/';
import Icon from '../Icon/Icon';
import { TodayWaterModal } from '../TodayWaterModal/TodayWaterModal';
import { ButtonBtn } from '../ButtonBtn/ButtonBtn';
import { getCurrentDayInfoAPI } from '../../redux/water/waterOperation/';
import css from './TodayWaterListItem.module.css';

export const TodayWaterListItem = ({ waterItem }) => {
  const { waterVolume, time, _id } = waterItem;

  const dispatch = useDispatch();
  useSelector(selector.selectDayInfo);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    return setIsModalOpen(!isModalOpen);
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteWaterAPI(_id));

      toast.success('Entry deleted successfully!');
      toggleModal();
      dispatch(getCurrentDayInfoAPI());
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete the entry.');
    }
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
          onClick={() => {}}
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
      <Toaster />
    </div>
  );
};
