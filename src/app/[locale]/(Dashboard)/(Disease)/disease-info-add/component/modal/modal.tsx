import { Button, Modal } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface ModelComponentProps {
    title: string;
    body: string;
    open: boolean;
    handleClose: () => void;
}
const ModalComponent: React.FC<ModelComponentProps> =({ title, body, open, handleClose}) => {

    const [isModalOpen, setIsModalOpen] = useState(open);

    const t = useTranslations('Disease');
    console.log(isModalOpen);
    return (
        <Modal
            title={title}
            open={isModalOpen}
            onCancel={handleClose}
            footer={[
                <Button key="back" onClick={handleClose}>
                    {t('close')}
                </Button>
            ]}
        >
            <p>{body}</p>
        </Modal>
    );
};

export default ModalComponent;
