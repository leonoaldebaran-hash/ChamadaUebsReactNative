import { StyleSheet } from 'react-native'
import Cores from '../../utils/Cores'

export default StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  primario: {
    backgroundColor: Cores.primaria,
  },
  primarioTexto: {
    color: '#fff',
  },
  contorno: {
    backgroundColor: Cores.fundo,
    borderWidth: 1,
    borderColor: Cores.borda,
  },
  contornoTexto: {
    color: Cores.texto,
  },
  link: {
    width: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 6,
    marginVertical: 0,
  },
  linkTexto: {
    color: Cores.primaria,
    fontWeight: '600',
  },
});
