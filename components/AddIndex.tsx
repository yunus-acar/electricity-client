import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { addIndex } from '@/api/index/add.api';
import { IoAdd } from 'react-icons/io5';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { useModalStore } from '@/stores/modal.store';

const AddIndex = () => {
  const { setShow, show } = useModalStore();
  const { mutateAsync, isLoading } = useMutation(addIndex);
  const [value, setValue] = useState<number>(0);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  const handleAddIndex = async () => {
    try {
      await mutateAsync({
        value,
        date,
      });
      toast.success('Index added');
      setShow(false);
      setValue(0);
      setDate(dayjs().format('YYYY-MM-DD'));
    } catch (error: any) {
      toast.error("Couldn't add index", {
        description: error.message,
      });
    }
  };
  return (
    <>
      <Button
        onClick={() => setShow(true)}
        variant={'solid'}
        colorScheme={'teal'}
        size={'sm'}
        mr={4}
        leftIcon={<IoAdd />}
      >
        Add Index
      </Button>
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Index</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl id="value">
                <FormLabel>Value</FormLabel>
                <Input value={value} onChange={(e) => setValue(parseFloat(e.target.value))} type="number" />
              </FormControl>
              <FormControl id="date">
                <FormLabel>Date</FormLabel>
                <Input value={date} onChange={(e) => setDate(dayjs(e.target.value).format('YYYY-MM-DD'))} type="date" />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => setShow(false)}>
              Close
            </Button>
            <Button onClick={handleAddIndex} isLoading={isLoading} isDisabled={isLoading} colorScheme="blue">
              {isLoading ? 'Loading...' : 'Add'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddIndex;
