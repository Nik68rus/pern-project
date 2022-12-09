import { useState, useContext } from 'react';
import { Dropdown, Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../App';

interface Props {
  show: boolean;
  onHide: () => void;
}

interface IInfo {
  title: string;
  description: string;
  id: string;
}

const CreateDevice = ({ show, onHide }: Props) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState<IInfo[]>([]);

  const addParamHandler = () => {
    setInfo((prevState) => [
      ...prevState,
      { title: '', description: '', id: new Date().toISOString() },
    ]);
  };

  const removeParamHandler = (id: string) => {
    setInfo(info.filter((item) => item.id !== id));
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
          Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown>
            <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>Выберите бренд</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            placeholder="Введите название устройства"
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите название устройства"
            type="file"
          />
          <hr />
          <Button variant="outline-dark" onClick={addParamHandler}>
            Добавить новое свойство
          </Button>
          {info.map((item) => (
            <Row key={item.id} className="mt-3">
              <Col md={4}>
                <Form.Control placeholder="Введите название свойства" />
              </Col>
              <Col md={4}>
                <Form.Control placeholder="Введите значение свойства" />
              </Col>
              <Col md={4}>
                <Button
                  variant="outline-danger"
                  onClick={removeParamHandler.bind(this, item.id)}
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant="outline-danger">
          Закрыть
        </Button>
        <Button onClick={onHide} variant="outline-success">
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateDevice;
