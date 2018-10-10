import Enum from 'enum';

const statusCodes = new Enum({
    '0':'Enviado e Processando',
    '1': 'Aceito',
    '2': 'Recusado',
    '3': 'Aceito e  Transferido'
});
export default statusCodes;