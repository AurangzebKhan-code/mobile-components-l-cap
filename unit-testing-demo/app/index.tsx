import React, { useState, useCallback, useMemo } from 'react';
import { SafeAreaView, StatusBar, ScrollView, Text, View, StyleSheet, Alert } from 'react-native';
import { PaperProvider, Card, Button, Divider } from 'react-native-paper';
import { TLCButton, createButtonConfig } from '../src/components/tlc-button';
import { TLCLabel, createLabelConfig } from '../src/components/tlc-label';
import { TLCButtonConfig } from '../src/core/types/TLCButtonTypes';
import { TLCLabelConfig } from '../src/core/types/TLCLabelTypes';
import mobileConfig from '../src/config/mobile-config.json';

export default function Page() {
  const [eventLog, setEventLog] = useState<string[]>([]);

  const logEvent = useCallback((source: string, eventType: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${source}: ${eventType}${data ? ` - ${JSON.stringify(data)}` : ''}`;
    setEventLog(prev => [logEntry, ...prev.slice(0, 9)]);
  }, []);

  const clearLog = useCallback(() => setEventLog([]), []);

  const getPropertyDifferences = useCallback((defaultConfig: any, jsonConfig: any) => {
    const differences: string[] = [];
    Object.keys(jsonConfig).forEach(key => {
      if (key !== 'id' && jsonConfig[key] !== defaultConfig[key]) {
        differences.push(`${key}: "${defaultConfig[key]}" → "${jsonConfig[key]}"`);
      }
    });
    return differences;
  }, []);

  const buttonComponents = useMemo(() => {
    return Object.entries(mobileConfig.components)
      .filter(([, component]) => component.type === 'TLCButton')
      .map(([key, component]) => {
        const defaultConfig = createButtonConfig(`default-${key}`);
        const jsonConfig = component.config as TLCButtonConfig;
        const differences = getPropertyDifferences(defaultConfig, jsonConfig);
        return { key, defaultConfig, jsonConfig, differences };
      });
  }, [getPropertyDifferences]);

  const labelComponents = useMemo(() => {
    return Object.entries(mobileConfig.components)
      .filter(([, component]) => component.type === 'TLCLabel')
      .map(([key, component]) => {
        const defaultConfig = createLabelConfig(`default-${key}`);
        const jsonConfig = component.config as TLCLabelConfig;
        const differences = getPropertyDifferences(defaultConfig, jsonConfig);
        return { key, defaultConfig, jsonConfig, differences };
      });
  }, [getPropertyDifferences]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <PaperProvider>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>🎯 Interactive JSON Configuration Testing</Text>
          <Text style={styles.subtitle}>Test your JSON overrides with clickable components</Text>
          
          <Card style={styles.card}>
            <Card.Title title="🔘 Button Configuration Testing" />
            <Card.Content>
              {buttonComponents.map(({ key, defaultConfig, jsonConfig, differences }) => (
                <View key={key} style={styles.testSection}>
                  <Text style={styles.componentTitle}>📌 {key}</Text>
                  
                  <View style={styles.comparisonRow}>
                    <View style={styles.comparisonColumn}>
                      <Text style={styles.columnLabel}>Default Config</Text>
                      <View style={styles.componentBox}>
                        <TLCButton 
                          config={defaultConfig}
                          onEvent={(e) => logEvent(`Default-${key}`, e.type, e.data)}
                        />
                      </View>
                      <Text style={styles.configText}>Label: "{defaultConfig.label}"</Text>
                      <Text style={styles.configText}>Type: {defaultConfig.type}</Text>
                      <Text style={styles.configText}>Size: {defaultConfig.size}</Text>
                    </View>
                    
                    <View style={styles.comparisonColumn}>
                      <Text style={styles.columnLabel}>JSON Override</Text>
                      <View style={styles.componentBox}>
                        <TLCButton 
                          config={jsonConfig}
                          onEvent={(e) => logEvent(`JSON-${key}`, e.type, e.data)}
                        />
                      </View>
                      <Text style={styles.configText}>Label: "{jsonConfig.label}"</Text>
                      <Text style={styles.configText}>Type: {jsonConfig.type}</Text>
                      <Text style={styles.configText}>Size: {jsonConfig.size || 'medium'}</Text>
                    </View>
                  </View>
                  
                  {differences.length > 0 && (
                    <View style={styles.differencesBox}>
                      <Text style={styles.differencesTitle}>🔍 Overrides Applied:</Text>
                      {differences.map((diff, i) => (
                        <Text key={i} style={styles.differenceText}>• {diff}</Text>
                      ))}
                    </View>
                  )}
                  
                  <Divider style={styles.divider} />
                </View>
              ))}
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title title="🏷️ Label Configuration Testing" />
            <Card.Content>
              {labelComponents.map(({ key, defaultConfig, jsonConfig, differences }) => (
                <View key={key} style={styles.testSection}>
                  <Text style={styles.componentTitle}>📌 {key}</Text>
                  
                  <View style={styles.comparisonRow}>
                    <View style={styles.comparisonColumn}>
                      <Text style={styles.columnLabel}>Default Config</Text>
                      <View style={styles.componentBox}>
                        <TLCLabel 
                          config={defaultConfig}
                          onEvent={(e) => logEvent(`Default-${key}`, e.type, e.data)}
                        />
                      </View>
                      <Text style={styles.configText}>Text: "{defaultConfig.text}"</Text>
                      <Text style={styles.configText}>Visible: {String(defaultConfig.visible !== false)}</Text>
                    </View>
                    
                    <View style={styles.comparisonColumn}>
                      <Text style={styles.columnLabel}>JSON Override</Text>
                      <View style={styles.componentBox}>
                        {jsonConfig.visible !== false && jsonConfig.ngIf !== false ? (
                          <TLCLabel 
                            config={jsonConfig}
                            onEvent={(e) => logEvent(`JSON-${key}`, e.type, e.data)}
                          />
                        ) : (
                          <Text style={styles.hiddenText}>🚫 Component Hidden</Text>
                        )}
                      </View>
                      <Text style={styles.configText}>Text: "{jsonConfig.text}"</Text>
                      <Text style={styles.configText}>Visible: {String(jsonConfig.visible !== false)}</Text>
                      {jsonConfig.ngIf !== undefined && (
                        <Text style={styles.configText}>NgIf: {String(jsonConfig.ngIf)}</Text>
                      )}
                    </View>
                  </View>
                  
                  {differences.length > 0 && (
                    <View style={styles.differencesBox}>
                      <Text style={styles.differencesTitle}>🔍 Overrides Applied:</Text>
                      {differences.map((diff, i) => (
                        <Text key={i} style={styles.differenceText}>• {diff}</Text>
                      ))}
                    </View>
                  )}
                  
                  <Divider style={styles.divider} />
                </View>
              ))}
            </Card.Content>
          </Card>
              
          <Card style={styles.card}>
            <Card.Title title="📋 Live Event Log" />
            <Card.Content>
              <Button 
                mode="outlined" 
                onPress={clearLog} 
                style={styles.clearButton}
              >
                Clear Log
              </Button>
              <View style={styles.eventLogBox}>
                {eventLog.length > 0 ? (
                  eventLog.map((log, index) => (
                    <Text key={index} style={styles.eventText}>{log}</Text>
                  ))
                ) : (
                  <Text style={styles.noEventsText}>
                    No events yet. Click the buttons above to see events!
                  </Text>
                )}
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a202c',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#718096',
    fontStyle: 'italic',
  },
  card: {
    marginBottom: 20,
    elevation: 2,
  },
  testSection: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  componentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2d3748',
  },
  comparisonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  comparisonColumn: {
    flex: 1,
    backgroundColor: '#f7fafc',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  columnLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4a5568',
    textAlign: 'center',
  },
  componentBox: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  configText: {
    fontSize: 12,
    color: '#4a5568',
    marginBottom: 2,
  },
  hiddenText: {
    fontSize: 14,
    color: '#a0aec0',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  differencesBox: {
    backgroundColor: '#e6fffa',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#38b2ac',
    marginTop: 8,
  },
  differencesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#234e52',
  },
  differenceText: {
    fontSize: 12,
    color: '#2d3748',
    marginBottom: 2,
  },
  divider: {
    marginTop: 12,
    backgroundColor: '#e2e8f0',
  },
  eventLogBox: {
    backgroundColor: '#1a202c',
    padding: 12,
    borderRadius: 6,
    maxHeight: 200,
    minHeight: 60,
  },
  eventText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#68d391',
    marginBottom: 2,
  },
  noEventsText: {
    fontSize: 14,
    color: '#a0aec0',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
  clearButton: {
    marginBottom: 12,
  },
});
