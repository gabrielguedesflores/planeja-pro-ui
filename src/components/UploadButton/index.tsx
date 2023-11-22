import { useCallback, useRef, useState } from 'react';
import { CheckCircle, DeleteForever, FileUpload } from '@mui/icons-material';
import { CircularProgress, IconButton } from '@mui/material';
import { ButtonContainer, List, UploadContainer } from './styles';
import { createErrorMessage } from '../../utils';
import { Colors } from '../../assets/theme';
import Button from './Button';
import { useAuthContext } from '../../contexts';

const FILES_LIMIT = 8;
const FORMAT_ACCEPTED = '.pdf,.jpeg,.jpg,.png';

enum FILE_SIZE {
  IMG = 3000000,
  PDF = 3000000,
}

interface IUploadButtonProps {
  text?: string;
  cpf?: string;
  documentType: string;
  fileNames?: string[];
  document?: string;
  onChangeSuccess: (files: string[]) => void;
}

interface IFile {
  id: string;
  name: string;
}

const UploadButton = ({
  text = 'Carregar Documentos',
  cpf,
  documentType,
  fileNames,
  onChangeSuccess,
}: IUploadButtonProps) => {
  const { getSession } = useAuthContext();
  let session = getSession();
  const inputFileRef = useRef<any>(null);
  const [files, setFiles] = useState<any>(fileNames ?? []);
  const [fileErrors, setFileErrors] = useState<any>([]);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileDelete = async (id: string) => {
    setLoading(true);
    let newFilesList = files ?? [];

    if (files && files.length > 0) {
      files.map(async (item: any, index: any) => {
        try {
          const file = getFile(item);
          if (file && file?.id === id) newFilesList.splice(index, 1);
          // TODO: criar endpoint no bff para deletar uma imagem
          // await axiosInstance.delete(Endpoints.associacao.imagens(id, documentType));
          setLoading(false);
        } catch (woof) {
          const error = createErrorMessage(woof);
          setLoading(false);
          return error;
        }
      });
    }

    setFiles(newFilesList);
    onChangeSuccess(newFilesList.length > 0 ? newFilesList : null);
    setLoading(false);
  };

  const formatFileName = (file: string) => file.replace(/ /g, '_').replace(/-/g, '_');

  const updateFilesList = useCallback(
    (id: string, file: any) => {
      const filesList = files;

      filesList.push(`${id}-${formatFileName(file?.name)}`);
      setFiles(filesList);
      onChangeSuccess(filesList);
    },
    [files],
  );

  const uploadImage = async (file: any) => {
    setLoadingButton(true);
    try {
      const bodyFormData = new FormData();
      bodyFormData.append(
        'file',
        file,
        encodeURIComponent(`${session.user.id}.${file?.type.split('/')[1]}`),
      );

      // TODO: o container que roda na vercel é apenas readonly, não conseguimos salvar arquivos.
      // const response = await axiosInstance.post(
      //   Endpoints.upload.post(session.user.id),
      //   bodyFormData
      // );

      await updateFilesList(session.user.id, file);
      setLoadingButton(false);
      return true;
    } catch (woof) {
      const error = createErrorMessage(woof);
      setLoadingButton(false);
      return error;
    }
  };

  const handleSave = async (upload: FileList) => {
    setLoadingButton(true);
    let count = 0;
    let qntFiles = files?.length ?? 0;

    while (qntFiles < FILES_LIMIT && count < FILES_LIMIT) {
      const file = upload[count];
      if (file) {
        const name = decodeURIComponent(file.name);
        if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
          if (file.size > FILE_SIZE.IMG) {
            const newFileList = fileErrors ?? [];
            newFileList.push({
              ...file,
              error: `Identificamos que o arquivo ${name} possui mais que o limite permitido(3MB).
              Considere comprimir o documento para reduzir seu tamanho e, assim,
              termos um processo de alta performance em suas integrações.`,
            });
            await handleSetErrors(newFileList);
          } else {
            await uploadImage(file);
          }
        } else if (file.type === 'application/pdf') {
          if (file.size > FILE_SIZE.PDF) {
            const newFileList = fileErrors ?? [];
            newFileList.push({
              ...file,
              error: `Identificamos que o arquivo ${name} possui mais que o limite permitido(3MB).
              Considere comprimir o documento para reduzir seu tamanho e, assim,
              termos um processo de alta performance em suas integrações.
              Em breve teremos um compressor diretamente na plataforma`,
            });
            await handleSetErrors(newFileList);
          } else {
            await uploadImage(file);
          }
        }
      }
      count++;
      qntFiles++;
    }

    setLoadingButton(false);
  };

  const triggetInputClick = () => {
    if (inputFileRef.current) inputFileRef?.current?.click();
  };

  const handleSetErrors = (errors: any) => {
    setFileErrors(errors);
    onChangeSuccess(files);
  };

  const getFile = (item: any): IFile => ({ id: item.split('-')[0], name: item.split('-')[1] });

  return (
    <>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </div>
      )}
      <UploadContainer visible>
        <List>
          <li>
            <div className='title'>Imagem de Perfil</div>
          </li>

          {files && files?.length > 0 ? (
            <>
              {files?.map((item: any, index: number) => {
                const file: any = item ? getFile(item) : {};
                return (
                  <li className='list-item' key={index}>
                    <CheckCircle />
                    <div className='file'>{file?.name}</div>
                    <IconButton
                      aria-label='Delete'
                      onClick={() => handleFileDelete(file?.id)}
                      data-testid='upload-delete'
                    >
                      <DeleteForever style={{ color: Colors.feedback_negative_light }} />
                    </IconButton>
                  </li>
                );
              })}
            </>
          ) : null}

          {fileErrors ? (
            <>
              {fileErrors?.map((file: any, index: number) => (
                <li className='list-item error' key={index}>
                  <span className='material-icons'>cancel</span>
                  <div className='file'>{file.error}</div>
                </li>
              ))}
            </>
          ) : null}
        </List>

        <ButtonContainer>
          <Button
            styles={{ borderRadius: '4px', justifyContent: 'flex-start' }}
            id={`${cpf}_${documentType}`}
            onClick={triggetInputClick}
            startIcon={<FileUpload />}
            variant='outlined'
            loading={loadingButton}
            loadingMessage='Carregando'
            disabled={files?.length === FILES_LIMIT}
          >
            {text}
          </Button>
        </ButtonContainer>
      </UploadContainer>

      <input
        id={`${cpf}_${documentType}`}
        style={{ display: 'none' }}
        type='file'
        ref={inputFileRef}
        onChange={(e: any) => {
          if (e?.target?.files) handleSave(e.target.files);
        }}
        multiple
        accept={FORMAT_ACCEPTED}
        data-testid='upload-input'
      />

      O upload de imagens esta fora do ar no momento.
    </>
  );
};

export default UploadButton;
