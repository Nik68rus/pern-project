import { useRef } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { handleError } from '../../helpers';
import { createType } from '../../http/deviceAPI';

interface Props {
  show: boolean;
  onHide: () => void;
}
const CreateType = ({ show, onHide }: Props) => {
  const typeRef = useRef<HTMLInputElement | null>(null);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');

    if (!typeRef.current) return;

    console.log(typeRef.current.value);

    try {
      await createType(typeRef.current.value);
      toast('Тип создан успешно!');
      onHide();
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
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={submitHandler}>
        <Modal.Body>
          <Form.Control placeholder="Введите название типа" ref={typeRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="outline-danger">
            Закрыть
          </Button>
          <Button type="submit" variant="outline-success">
            Добавить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateType;
