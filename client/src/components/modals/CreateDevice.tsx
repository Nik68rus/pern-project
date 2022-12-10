import { observer } from 'mobx-react-lite';
import { useState, useContext, useEffect } from 'react';
import { Dropdown, Form, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { Context } from '../../App';
import { handleError } from '../../helpers';
import { createDevice, getBrands, getTypes } from '../../http/deviceAPI';

interface Props {
  show: boolean;
  onHide: () => void;
}

interface IInfo {
  title: string;
  description: string;
  id: string;
}

const CreateDevice = observer(({ show, onHide }: Props) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState<IInfo[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    getTypes().then((data) => device.setTypes(data));
    getBrands().then((data) => device.setBrands(data));
  }, [device]);

  const addParamHandler = () => {
    setInfo((prevState) => [
      ...prevState,
      { title: '', description: '', id: new Date().toISOString() },
    ]);
  };

  const removeParamHandler = (id: string) => {
    setInfo(info.filter((item) => item.id !== id));
  };

  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement;
    if (target.files) {
      setFile(target.files[0]);
    }
  };

  const infoChangeHandler = (id: string, title: string, value: string) => {
    setInfo(
      info.map((item) => (item.id === id ? { ...item, [title]: value } : item))
    );
    console.log(info);
  };

  const addDevice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price.toString());
    file && formData.append('img', file);
    device.selectedType &&
      formData.append('typeId', device.selectedType.toString());
    device.selectedBrand &&
      formData.append('brandId', device.selectedBrand.toString());
    formData.append(
      'info',
      JSON.stringify(
        info.map((i) => ({ title: i.title, description: i.description }))
      )
    );
    createDevice(formData)
      .then((data) => {
        toast('Устройство создано!');
        onHide();
      })
      .catch((err) => {
        handleError(err);
      });
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
      <Form onSubmit={addDevice}>
        <Modal.Body>
          <Dropdown>
            <Dropdown.Toggle>
              {device.types.find((type) => type.id === device.selectedType)
                ?.name || 'Выберите тип'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  key={type.id}
                  onClick={() => device.setSelectedType(type.id)}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.brands.find((brand) => brand.id === device.selectedBrand)
                ?.name || 'Выберите бренд'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand.id)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            placeholder="Введите название устройства"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите стоимость устройства"
            type="number"
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите название устройства"
            type="file"
            onChange={selectFile}
          />
          <hr />
          <Button variant="outline-dark" onClick={addParamHandler}>
            Добавить новое свойство
          </Button>
          {info.map((item) => (
            <Row key={item.id} className="mt-3">
              <Col md={4}>
                <Form.Control
                  placeholder="Введите название свойства"
                  onChange={(e) =>
                    infoChangeHandler(item.id, 'title', e.target.value)
                  }
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  placeholder="Введите значение свойства"
                  onChange={(e) =>
                    infoChangeHandler(item.id, 'description', e.target.value)
                  }
                />
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
});

export default CreateDevice;
