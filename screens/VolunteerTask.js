/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import VolunteerContext from '../volunteer-context';
import StatusBadge from '../components/StatusBadge';
import { Button } from '../components/Button';
import moment from 'moment';

import { View, Text, StyleSheet, Dimensions } from 'react-native';

const VolunteerTask = ({ navigation }) => {
  const { singleList, formatDate } = useContext(VolunteerContext);

  if (!singleList) {
    return (
      <View>
        <Text>No selected list</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View>
          <View style={styles.details}>
            <Text style={styles.header}>Task Details</Text>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Name: </Text>
                {singleList.userDetails.name}
              </Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Delivery Address: </Text>
                {`${singleList.userDetails.address}, ${
                  singleList.userDetails.city
                } ${singleList.userDetails.state.toUpperCase()}`}
              </Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Store: </Text>
                {`${
                  singleList.data.attributes.name === 'KINGSOOPERS'
                    ? 'King Soopers'
                    : singleList.data.attributes.name
                }, ${singleList.data.attributes.address}, ${
                  singleList.data.attributes.city
                } ${singleList.data.attributes.state.toUpperCase()}`}
              </Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Ordered at: </Text>
                {moment(formatDate(singleList.data.attributes.created_date))
                  .subtract(6, 'hours')
                  .format('h:m a MMM. D, YYYY')}
              </Text>
            </View>
            <View style={styles.infoField}>
              <Text style={styles.detailsKind}>
                <Text style={styles.infoKind}>Items: </Text>
                {singleList.data.attributes.items.reduce((acc, el) => {
                  acc += el.quantity;
                  return acc;
                }, 0)}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.statusRow}>
              <Text style={[styles.infoKind, styles.detailsKind]}>Status:</Text>
              <StatusBadge
                status={singleList.data.attributes.status}
                onPress={() =>
                  navigation.navigate('Change Status', {
                    item: singleList,
                  })
                }
              />
            </View>
            <Button
              text="Update Status"
              customTextStyles={{
                fontSize: 20,
                color: 'black',
              }}
              customStyles={{
                backgroundColor: 'lightgray',
                width: 250,
                marginVertical: 20,
              }}
              onPress={() =>
                navigation.navigate('Change Status', {
                  item: singleList,
                })
              }
            />
          </View>

          <Button
            text="Abandon Task"
            onPress={() =>
              navigation.navigate('Confirm Delete', {
                item: singleList,
              })
            }
            customStyles={{ backgroundColor: 'red', width: 250 }}
            customTextStyles={{ fontSize: 20 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    width: 300,
    marginVertical: 50,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  infoField: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  infoKind: {
    fontFamily: 'HelveticaNeue-Bold',
  },
  detailsKind: {
    fontSize: 18,
  },
  statusUpdate: {
    fontFamily: 'HelveticaNeue-Bold',
    textAlign: 'center',
  },
  statusUpdateHidden: {
    opacity: 0,
  },
  picker: {
    alignSelf: 'center',
    height: 90,
    width: 200,
    marginBottom: 120,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 35,
    fontWeight: 'bold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  statusText: {
    fontSize: 16,
    marginBottom: -4,
  },
  details: {
    marginBottom: -20,
  },
  buttonArea: {
    margin: 30,
    paddingTop: 30,
  },
});

export default VolunteerTask;
