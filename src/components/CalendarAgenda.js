// src/components/CalendarAgenda.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

// Configuração do calendário para exibir em português
LocaleConfig.locales['pt-BR'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};

LocaleConfig.defaultLocale = 'pt-BR';

const CalendarAgenda = () => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    const newItems = { ...items };
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);
      if (!newItems[strTime]) {
        newItems[strTime] = [];
        const numItems = Math.floor(Math.random() * 3 + 1);
        for (let j = 0; j < numItems; j++) {
          newItems[strTime].push({
            name: `Evento para o dia ${strTime}`,
            height: Math.max(50, Math.floor(Math.random() * 150)),
          });
        }
      }
    }
    setItems(newItems);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={new Date().toISOString().split('T')[0]}
      renderItem={renderItem}
      theme={{
        agendaTodayColor: '#ff80c3',
        dotColor: '#ff80c3',
        selectedDotColor: '#ff80c3',
        agendaKnobColor: '#121212',
      }}
    />
  );
};

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});

export default CalendarAgenda;
