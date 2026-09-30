import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Logo from './components/logo/Logo';
import CustomButton from './components/customButton/CustomButton';
import Cores from './utils/Cores';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.cartao}>
          <Logo />
          <Text style={styles.title}>
            Gestão de Fretamento Universitário{' '}
            <MaterialCommunityIcons name="bus-school" size={26} color={Cores.primaria} />
          </Text>
          <Text style={styles.subtitle}>
            Alunos, coordenadores e administradores
          </Text>

          <View style={styles.areaCampos}>
            <Text style={styles.textoAreaCampos}>Campos de e-mail e senha (Tarefa 3)</Text>
          </View>

          <CustomButton
            title="Entrar"
            onPress={() => alert('Login: vamos programar na Tarefa 6')}
          />
          <CustomButton
            title="Esqueci minha senha"
            variante="link"
            onPress={() => alert('Recuperar senha: em breve')}
          />

          <View style={styles.divisor}>
            <View style={styles.linha} />
            <Text style={styles.textoDivisor}>ou</Text>
            <View style={styles.linha} />
          </View>

          <CustomButton
            title="Entrar com Google"
            variante="contorno"
            onPress={() => alert('Login com Google: em breve')}
          />

          <View style={styles.rodape}>
            <Text style={styles.textoRodape}>Aluno novo?</Text>
            <CustomButton
              title="Criar conta"
              variante="link"
              onPress={() => alert('Cadastro de aluno: em breve')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cartao: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Cores.texto,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: Cores.textoSecundario,
    textAlign: 'center',
    marginBottom: 24,
  },
  areaCampos: {
    width: '100%',
    height: 110,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Cores.borda,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  textoAreaCampos: {
    color: Cores.textoSecundario,
    fontSize: 13,
  },
  divisor: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 12,
  },
  linha: {
    flex: 1,
    height: 1,
    backgroundColor: Cores.borda,
  },
  textoDivisor: {
    marginHorizontal: 12,
    color: Cores.textoSecundario,
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  textoRodape: {
    color: Cores.textoSecundario,
    fontSize: 15,
  },
});
