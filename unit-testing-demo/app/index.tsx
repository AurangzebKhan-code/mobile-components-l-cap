import React, { useState, useCallback, useMemo } from 'react';
import { SafeAreaView, StatusBar, ScrollView, Text, View, StyleSheet } from 'react-native';
import { PaperProvider, Card, Button, Divider } from 'react-native-paper';
import { TLCButton, createButtonConfig } from '../projects/tlc-components-mobile/tlc-button';
import { TLCLabel, createLabelConfig } from '../projects/tlc-components-mobile/tlc-label';
import { TLCButtonConfig } from '../projects/tlc-base';
import { TLCLabelConfig } from '../projects/tlc-base';
import mobileConfig from '../src/config/mobile-config.json';

/**
 * Main testing page component that demonstrates TLC component configuration and JSON overrides.
 * Provides interactive testing interface for comparing default configurations with JSON-based overrides.
 */
export default function Page() {
  /** Array of recent component event logs for debugging and monitoring */
  const [eventLog, setEventLog] = useState<string[]>([]);

  /**
   * Logs component events with timestamp and source information
   * @param source - Source component identifier (e.g., "Default-button1", "JSON-label2")
   * @param eventType - Type of event that occurred (e.g., "press", "textChanged")
   * @param data - Optional event payload data
   */
  const logEvent = useCallback((source: string, eventType: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${source}: ${eventType}${data ? ` - ${JSON.stringify(data)}` : ''}`;
    setEventLog(prev => [logEntry, ...prev.slice(0, 9)]);
  }, []);

  /** Clears the event log display */
  const clearLog = useCallback(() => setEventLog([]), []);

  /**
   * Compares default configuration with JSON override configuration to identify differences
   * @param defaultConfig - Default component configuration object
   * @param jsonConfig - JSON override configuration object
   * @returns Array of strings describing configuration differences
   */
  const getPropertyDifferences = useCallback((defaultConfig: any, jsonConfig: any) => {
    const differences: string[] = [];
    Object.keys(jsonConfig).forEach(key => {
      if (key !== 'id' && jsonConfig[key] !== defaultConfig[key]) {
        differences.push(`${key}: "${defaultConfig[key]}" → "${jsonConfig[key]}"`);
      }
    });
    return differences;
  }, []);

  /**
   * Processes button components from mobile configuration, creating comparison data structures
   * @returns Array of button component data with default configs, JSON configs, and differences
   */
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

  /**
   * Processes label components from mobile configuration, creating comparison data structures
   * @returns Array of label component data with default configs, JSON configs, and differences
   */
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
          
          {/* Button Configuration Testing Section */}
          <Card style={styles.card}>
            <Card.Title title="🔘 Button Configuration Testing" />
            <Card.Content>
              {buttonComponents.map(({ key, defaultConfig, jsonConfig, differences }) => (
                <View key={key} style={styles.testSection}>
                  <Text style={styles.componentTitle}>📌 {key}</Text>
                  
                  {/* Side-by-side comparison of default vs JSON override */}
                  <View style={styles.comparisonRow}>
                    <View style={styles.comparisonColumn}>
                      <Text style={styles.columnLabel}>Default Config</Text>
                      <View style={styles.componentBox}>
                        <TLCButton 
                          config={defaultConfig}
                          tlcClick={(e) => logEvent(`Default-${key}`, 'click', { label: e.label, x: e.eventMeta?.x, y: e.eventMeta?.y })}
                          tlcInit={() => logEvent(`Default-${key}`, 'initialized')}
                          tlcDestroy={() => logEvent(`Default-${key}`, 'destroyed')}
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
                          tlcClick={(e) => logEvent(`JSON-${key}`, 'click', { label: e.label, x: e.eventMeta?.x, y: e.eventMeta?.y })}
                          tlcInit={() => logEvent(`JSON-${key}`, 'initialized')}
                          tlcDestroy={() => logEvent(`JSON-${key}`, 'destroyed')}
                        />
                      </View>
                      <Text style={styles.configText}>Label: "{jsonConfig.label}"</Text>
                      <Text style={styles.configText}>Type: {jsonConfig.type}</Text>
                      <Text style={styles.configText}>Size: {jsonConfig.size || 'medium'}</Text>
                    </View>
                  </View>
                  
                  {/* Display configuration differences if any exist */}
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

          {/* Label Configuration Testing Section */}
          <Card style={styles.card}>
            <Card.Title title="🏷️ Label Configuration Testing" />
            <Card.Content>
              {labelComponents.map(({ key, defaultConfig, jsonConfig, differences }) => (
                <View key={key} style={styles.testSection}>
                  <Text style={styles.componentTitle}>📌 {key}</Text>
                  
                  {/* Side-by-side comparison of default vs JSON override */}
                  <View style={styles.comparisonRow}>
                    <View style={styles.comparisonColumn}>
                      <Text style={styles.columnLabel}>Default Config</Text>
                      <View style={styles.componentBox}>
                        <TLCLabel 
                          config={defaultConfig}
                          tlcTextChanged={(e) => logEvent(`Default-${key}`, 'textChanged', { text: e.text, previousText: e.previousText })}
                          tlcInit={() => logEvent(`Default-${key}`, 'initialized')}
                          tlcDestroy={() => logEvent(`Default-${key}`, 'destroyed')}
                        />
                      </View>
                      <Text style={styles.configText}>Text: "{defaultConfig.text}"</Text>
                      <Text style={styles.configText}>Visible: {String(defaultConfig.visible !== false)}</Text>
                    </View>
                    
                    <View style={styles.comparisonColumn}>
                      <Text style={styles.columnLabel}>JSON Override</Text>
                      <View style={styles.componentBox}>
                        {/* Conditionally render label or hidden message based on visibility */}
                        {jsonConfig.visible !== false && jsonConfig.ngIf !== false ? (
                          <TLCLabel 
                            config={jsonConfig}
                            tlcTextChanged={(e) => logEvent(`JSON-${key}`, 'textChanged', { text: e.text, previousText: e.previousText })}
                            tlcInit={() => logEvent(`JSON-${key}`, 'initialized')}
                            tlcDestroy={() => logEvent(`JSON-${key}`, 'destroyed')}
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
                  
                  {/* Display configuration differences if any exist */}
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
              
          {/* Live Event Monitoring Section */}
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
              {/* Real-time event log display with scrollable content */}
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

/**
 * Stylesheet containing all component styling definitions with modern design patterns
 */
const styles = StyleSheet.create({
  /** Main container with full height, padding, and light background */
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f7fa',
  },
  /** Large centered title text with dark color and bold weight */
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a202c',
  },
  /** Smaller italic subtitle text centered below the main title */
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#718096',
    fontStyle: 'italic',
  },
  /** Card component styling with margin and shadow elevation */
  card: {
    marginBottom: 20,
    elevation: 2,
  },
  /** Individual test section container with white background and border */
  testSection: {
    marginBottom: 20,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  /** Component identifier title with medium size and dark color */
  componentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2d3748',
  },
  /** Horizontal flex row for side-by-side component comparison */
  comparisonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  /** Individual comparison column with light background and subtle border */
  comparisonColumn: {
    flex: 1,
    backgroundColor: '#f7fafc',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  /** Column header label with bold weight and centered alignment */
  columnLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4a5568',
    textAlign: 'center',
  },
  /** Component display container with white background and center alignment */
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
  /** Small text for displaying configuration properties */
  configText: {
    fontSize: 12,
    color: '#4a5568',
    marginBottom: 2,
  },
  /** Muted italic text for showing hidden component states */
  hiddenText: {
    fontSize: 14,
    color: '#a0aec0',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  /** Highlighted box for displaying configuration differences with teal accent */
  differencesBox: {
    backgroundColor: '#e6fffa',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#38b2ac',
    marginTop: 8,
  },
  /** Bold title text for the differences section */
  differencesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#234e52',
  },
  /** Individual difference item text with bullet point styling */
  differenceText: {
    fontSize: 12,
    color: '#2d3748',
    marginBottom: 2,
  },
  /** Divider line with subtle background color and top margin */
  divider: {
    marginTop: 12,
    backgroundColor: '#e2e8f0',
  },
  /** Dark terminal-style container for event log display with scrolling */
  eventLogBox: {
    backgroundColor: '#1a202c',
    padding: 12,
    borderRadius: 6,
    maxHeight: 200,
    minHeight: 60,
  },
  /** Monospace font styling for event log entries with green color */
  eventText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#68d391',
    marginBottom: 2,
  },
  /** Placeholder text shown when no events are available */
  noEventsText: {
    fontSize: 14,
    color: '#a0aec0',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
  /** Clear button styling with bottom margin for spacing */
  clearButton: {
    marginBottom: 12,
  },
});
