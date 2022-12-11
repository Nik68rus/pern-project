import { observer } from 'mobx-react-lite';
import { useState, useEffect, useRef, useContext } from 'react';
import { Badge, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Context } from '../../App';
import { handleError } from '../../helpers';
import { getAdmins, updateUser } from '../../http/userAPI';
import { User } from '../../store/UserStore';
import classes from './ManageRoles.module.scss';
import { TUserRole } from '../../types/user';

interface Props {
  show: boolean;
  onHide: () => void;
}
const ManageRoles = observer(({ show, onHide }: Props) => {
  const [admins, setAdmins] = useState<User[]>([]);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const { user } = useContext(Context);

  useEffect(() => {
    if (show) {
      getAdmins()
        .then((data) => setAdmins(data))
        .catch((err) => handleError(err));
    }
  }, [show]);

  const handleChange = async (email: string, role: TUserRole) => {
    try {
      const response = await updateUser(email, role);
      getAdmins().then((data) => setAdmins(data));
      toast(response);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Управление ролями пользователей
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>Список администраторов:</h6>
        {admins.map((u) => (
          <div className={classes.user}>
            {u.email}
            <Badge bg="primary">ADMIN</Badge>
            <Button
              size="sm"
              variant="outline-secondary"
              disabled={u.email === user.user?.email}
              onClick={() => {
                handleChange(u.email, 'USER');
              }}
            >
              <FaTimes />
            </Button>
          </div>
        ))}
        <hr />
        <h6>
          Введите e-mail пользователя, чтобы назначить его администратором:
        </h6>
        <div className={classes.row}>
          <Form.Control placeholder="Введите e-mail" ref={emailRef} />
          <Button
            type="submit"
            variant="outline-success"
            onClick={() => handleChange(emailRef.current?.value || '', 'ADMIN')}
          >
            Назначить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
});

export default ManageRoles;
