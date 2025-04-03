import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard, ScrollView, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('converter');
  const [temperature, setTemperature] = useState("");
  const [convertedTemperature, setConvertedTemperature] = useState(null);
  const [conversionMode, setConversionMode] = useState('celsiusToFahrenheit'); // ['celsiusToFahrenheit', 'fahrenheitToCelsius', 'celsiusToKelvin', 'kelvinToCelsius', 'fahrenheitToKelvin', 'kelvinToFahrenheit']
  const [countryTemperatures, setCountryTemperatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  // Função para converter temperatura
  function convertTemperature() {
    if (!temperature) return;
    const numericValue = parseFloat(temperature);
    if (isNaN(numericValue)) return;
    
    let result;
    let unit;
    
    switch(conversionMode) {
      case 'celsiusToFahrenheit':
        result = ((numericValue * 9/5) + 32).toFixed(2);
        unit = '°F';
        break;
      case 'fahrenheitToCelsius':
        result = ((numericValue - 32) * 5/9).toFixed(2);
        unit = '°C';
        break;
      case 'celsiusToKelvin':
        result = (numericValue + 273.15).toFixed(2);
        unit = 'K';
        break;
      case 'kelvinToCelsius':
        result = (numericValue - 273.15).toFixed(2);
        unit = '°C';
        break;
      case 'fahrenheitToKelvin':
        result = (((numericValue - 32) * 5/9) + 273.15).toFixed(2);
        unit = 'K';
        break;
      case 'kelvinToFahrenheit':
        result = (((numericValue - 273.15) * 9/5) + 32).toFixed(2);
        unit = '°F';
        break;
      default:
        return;
    }
    
    setConvertedTemperature({ value: result, unit });
    Keyboard.dismiss();
  }

  // Função para limpar campos
  function clearAll() {
    setTemperature("");
    setConvertedTemperature(null);
  }

  // Função para buscar temperaturas dos países (simulada)
  const fetchCountryTemperatures = async () => {
    setLoading(true);
    try {
      // Simulando uma chamada de API com dados estáticos
      const mockData = [
        { country: 'Brasil', temperature: 28.5, unit: '°C' },
        { country: 'Estados Unidos', temperature: 72.3, unit: '°F' },
        { country: 'Japão', temperature: 18.2, unit: '°C' },
        { country: 'Alemanha', temperature: 14.7, unit: '°C' },
        { country: 'Canadá', temperature: 62.1, unit: '°F' },
        { country: 'Austrália', temperature: 22.4, unit: '°C' },
        { country: 'Reino Unido', temperature: 12.8, unit: '°C' },
        { country: 'França', temperature: 16.3, unit: '°C' },
        { country: 'Índia', temperature: 30.1, unit: '°C' },
        { country: 'Rússia', temperature: 5.2, unit: '°C' },
        { country: 'China', temperature: 20.7, unit: '°C' },
        { country: 'México', temperature: 25.9, unit: '°C' },
        { country: 'Itália', temperature: 17.5, unit: '°C' },
        { country: 'Espanha', temperature: 19.8, unit: '°C' },
        { country: 'Argentina', temperature: 15.3, unit: '°C' },
        { country: 'África do Sul', temperature: 23.6, unit: '°C' },
        { country: 'Egito', temperature: 27.4, unit: '°C' },
        { country: 'Suécia', temperature: 8.9, unit: '°C' },
        { country: 'Noruega', temperature: 7.5, unit: '°C' },
        { country: 'Nova Zelândia', temperature: 13.2, unit: '°C' },
      ];
      
      setCountryTemperatures(mockData);
      setLastUpdated(new Date().toLocaleString());
    } catch (error) {
      console.error("Erro ao buscar temperaturas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carrega as temperaturas quando a aba é aberta
  useEffect(() => {
    if (activeTab === 'global') {
      fetchCountryTemperatures();
    }
  }, [activeTab]);

  // Obtém o texto do input com base no modo de conversão
  const getInputLabel = () => {
    switch(conversionMode) {
      case 'celsiusToFahrenheit':
      case 'celsiusToKelvin':
        return "Graus Celsius (°C)";
      case 'fahrenheitToCelsius':
      case 'fahrenheitToKelvin':
        return "Graus Fahrenheit (°F)";
      case 'kelvinToCelsius':
      case 'kelvinToFahrenheit':
        return "Kelvin (K)";
      default:
        return "";
    }
  };

  // Obtém o texto do resultado com base no modo de conversão
  const getResultLabel = () => {
    switch(conversionMode) {
      case 'celsiusToFahrenheit':
        return "Graus Fahrenheit (°F)";
      case 'fahrenheitToCelsius':
        return "Graus Celsius (°C)";
      case 'celsiusToKelvin':
        return "Kelvin (K)";
      case 'kelvinToCelsius':
        return "Graus Celsius (°C)";
      case 'fahrenheitToKelvin':
        return "Kelvin (K)";
      case 'kelvinToFahrenheit':
        return "Graus Fahrenheit (°F)";
      default:
        return "";
    }
  };

  // Obtém o placeholder com base no modo de conversão
  const getInputPlaceholder = () => {
    switch(conversionMode) {
      case 'celsiusToFahrenheit':
      case 'celsiusToKelvin':
        return "Digite a temperatura em Celsius";
      case 'fahrenheitToCelsius':
      case 'fahrenheitToKelvin':
        return "Digite a temperatura em Fahrenheit";
      case 'kelvinToCelsius':
      case 'kelvinToFahrenheit':
        return "Digite a temperatura em Kelvin";
      default:
        return "";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons 
          name="earth" 
          size={32} 
          color="#FFF" 
        />
        <Text style={styles.headerTitle}>Temperatura Global</Text>
      </View>

      {/* Abas */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'converter' && styles.activeTab]}
          onPress={() => setActiveTab('converter')}
        >
          <Text style={styles.tabText}>Conversor</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'global' && styles.activeTab]}
          onPress={() => setActiveTab('global')}
        >
          <Text style={styles.tabText}>Temperaturas Globais</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo baseado na aba selecionada */}
      {activeTab === 'converter' ? (
        <View style={styles.content}>
          {/* Input Section */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{getInputLabel()}</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder={getInputPlaceholder()}
                placeholderTextColor="#999"
                value={temperature}
                onChangeText={setTemperature}
                keyboardType="numeric"
                selectionColor="#6200EE"
              />
              {temperature.length > 0 && (
                <TouchableOpacity onPress={clearAll} style={styles.clearButton}>
                  <MaterialCommunityIcons name="close-circle" size={20} color="#999" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Convert Button */}
          <TouchableOpacity 
            style={styles.convertButton} 
            onPress={convertTemperature}
            disabled={!temperature}
          >
            <MaterialCommunityIcons 
              name="autorenew" 
              size={24} 
              color="#FFF" 
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Converter</Text>
          </TouchableOpacity>

          {/* Result Section */}
          {convertedTemperature !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>{getResultLabel()}</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultValue}>{convertedTemperature.value}</Text>
                <Text style={styles.resultUnit}>
                  {convertedTemperature.unit}
                </Text>
              </View>
            </View>
          )}

          {/* Mode Selection */}
          <View style={styles.modeSelection}>
            <Text style={styles.modeTitle}>Selecione o tipo de conversão:</Text>
            
            <TouchableOpacity 
              style={[styles.modeButton, conversionMode === 'celsiusToFahrenheit' && styles.activeModeButton]}
              onPress={() => {
                setConversionMode('celsiusToFahrenheit');
                clearAll();
              }}
            >
              <Text style={styles.modeButtonText}>°C → °F</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modeButton, conversionMode === 'fahrenheitToCelsius' && styles.activeModeButton]}
              onPress={() => {
                setConversionMode('fahrenheitToCelsius');
                clearAll();
              }}
            >
              <Text style={styles.modeButtonText}>°F → °C</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modeButton, conversionMode === 'celsiusToKelvin' && styles.activeModeButton]}
              onPress={() => {
                setConversionMode('celsiusToKelvin');
                clearAll();
              }}
            >
              <Text style={styles.modeButtonText}>°C → K</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modeButton, conversionMode === 'kelvinToCelsius' && styles.activeModeButton]}
              onPress={() => {
                setConversionMode('kelvinToCelsius');
                clearAll();
              }}
            >
              <Text style={styles.modeButtonText}>K → °C</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modeButton, conversionMode === 'fahrenheitToKelvin' && styles.activeModeButton]}
              onPress={() => {
                setConversionMode('fahrenheitToKelvin');
                clearAll();
              }}
            >
              <Text style={styles.modeButtonText}>°F → K</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modeButton, conversionMode === 'kelvinToFahrenheit' && styles.activeModeButton]}
              onPress={() => {
                setConversionMode('kelvinToFahrenheit');
                clearAll();
              }}
            >
              <Text style={styles.modeButtonText}>K → °F</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.globalContent}>
          <View style={styles.updateInfo}>
            <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
            <Text style={styles.updateText}>Atualizado em: {lastUpdated || 'Nunca'}</Text>
            <TouchableOpacity onPress={fetchCountryTemperatures} style={styles.refreshButton}>
              <MaterialCommunityIcons name="refresh" size={16} color="#6200EE" />
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#6200EE" style={styles.loader} />
          ) : (
            <View style={styles.countryList}>
              {countryTemperatures.map((item, index) => (
                <View key={index} style={styles.countryItem}>
                  <View style={styles.countryFlagContainer}>
                    <MaterialCommunityIcons 
                      name="flag-outline" 
                      size={20} 
                      color="#666" 
                      style={styles.flagIcon}
                    />
                    <Text style={styles.countryName}>{item.country}</Text>
                  </View>
                  <View style={styles.temperatureBadge}>
                    <Text style={styles.temperatureText}>
                      {item.temperature} {item.unit}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.note}>
            Nota: Os dados são simulados. Em uma aplicação real, você precisaria integrar com uma API de previsão do tempo.
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6200EE',
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#6200EE',
  },
  tabText: {
    color: '#333',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  globalContent: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 8,
  },
  convertButton: {
    backgroundColor: '#6200EE',
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#6200EE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginRight: 8,
  },
  resultContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6200EE',
    marginRight: 4,
  },
  resultUnit: {
    fontSize: 24,
    color: '#6200EE',
  },
  modeSelection: {
    marginTop: 32,
  },
  modeTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  modeButton: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  activeModeButton: {
    backgroundColor: '#6200EE',
  },
  modeButtonText: {
    color: '#1976D2',
    fontWeight: '600',
    textAlign: 'center',
  },
  activeModeButtonText: {
    color: '#FFF',
  },
  updateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  updateText: {
    marginLeft: 8,
    marginRight: 16,
    color: '#666',
    fontSize: 14,
  },
  refreshButton: {
    padding: 4,
  },
  countryList: {
    marginBottom: 16,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  countryFlagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: {
    marginRight: 8,
  },
  countryName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  temperatureBadge: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  temperatureText: {
    color: '#1976D2',
    fontWeight: '600',
  },
  loader: {
    marginVertical: 32,
  },
  note: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
});