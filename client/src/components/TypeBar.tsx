import { observer } from 'mobx-react-lite';
import { useState, useContext } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Context } from '../App';
// import { Link } from 'react-router-dom';
// import { RoutePath } from '../types/routes';
import classes from './TypeBar.module.scss';
import cx from 'classnames';
import { deleteType, editType } from '../http/deviceAPI';
import { toast } from 'react-toastify';
import { handleError } from '../helpers';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';
import { ITypeBrand } from '../types/device';

const TypeBar = observer(() => {
  const { device, user } = useContext(Context);

  const [editingType, setEditingType] = useState<ITypeBrand | null>(null);

  // const [editing, setEditing] = useState<null | number>(null);
  // const [newValue, setNewValue] = useState('');

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteType(id);
      toast.success(response);
      device.setTypes(device.types.filter((t) => t.id !== id));
    } catch (error) {
      handleError(error);
    }
  };

  const handleUpdate = async (type: ITypeBrand) => {
    try {
      const response = await editType(type);
      toast.success(response);
      device.setTypes(
        device.types.map((t) =>
          t.id === type.id ? { ...t, name: type.name } : t
        )
      );
      setEditingType(null);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <ListGroup className={cx('mt-3', classes.list)}>
      {device.types.map((type) => (
        <ListGroup.Item
          key={type.id}
          onClick={() => {
            device.setSelectedType(type.id);
            device.setPage(1);
          }}
          active={device.selectedType === type.id}
          className={cx(classes.item, {
            [classes.editing]: type.id === editingType?.id,
          })}
        >
          {editingType && type.id === editingType.id ? (
            <input
              type="text"
              value={editingType.name}
              onChange={(e) =>
                setEditingType((prev) => ({
                  id: editingType.id,
                  name: e.target.value,
                }))
              }
            />
          ) : (
            type.name
          )}
          {user.user?.role === 'ADMIN' && (
            <div className={classes.adminActions}>
              <Button
                size="sm"
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingType(type);
                }}
              >
                <FaEdit />
              </Button>
              <Button
                size="sm"
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(type.id);
                }}
              >
                <FaTimes />
              </Button>
            </div>
          )}
          {editingType && type.id === editingType.id && (
            <div className={classes.editActions}>
              <Button
                size="sm"
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdate(editingType);
                }}
              >
                <FaCheck />
              </Button>
              <Button
                size="sm"
                variant="light"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingType(null);
                }}
              >
                <FaTimes />
              </Button>
            </div>
          )}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
