import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import axios from "axios";
import * as Contacts from "expo-contacts";
import { colors } from "../config/colors";
import { AuthenticatedUserContext } from "../context/AuthenticatedUser/AuthenticatedUserContext";
import { serverAddress } from "../config/ipAddress";
import Search from "./Search";
import ContactItem from "./ContactItem";

const ContactsView = ({chatUsers, setChatUsers}) => {
  const { token } = useContext(AuthenticatedUserContext);
  const [contacts, setContacts] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

  const formatNumber = (num) => {
    if (num.startsWith("+972")) {
      return num.replace("+972 ", "0").replaceAll("-", "").replaceAll(" ", "");
    }
    return num;
  };

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        if (data.length > 0) {
          const result = data.map((obj) => {
            return {
              firstName: obj.firstName,
              number: formatNumber(obj.phoneNumbers[0].number),
            };
          });

          const numbers = [];
          for (const value in result) {
            numbers.push(result[value].number);
          }

          try {
            const response = await axios.get(
              `${serverAddress}/users/contacts`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                params: {
                  contactsNumbers: numbers,
                },
              }
            );
            setContacts(response.data.contacts);
            setFilteredData(response.data.contacts);
          } catch (error) {
            console.error(error);
          }
        }
      }
    })();
  }, []);

  const handleFilter = (filteredData) => {
    setFilteredData(filteredData);
  };

  const handleContactPress = (contact) => {
    if (chatUsers.includes(contact)) {
      setChatUsers(chatUsers.filter((user) => user !== contact));
    } else {
      setChatUsers([...chatUsers, contact]);
    }
  };

  const renderItem = ({ item }) => <ContactItem contact={item} onPress={handleContactPress}/>;

  return (
    <>
      <View style={styles.searchContainer}>
        <Search data={contacts} filterParam="name" onFilter={handleFilter} />
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.phoneNumber}
        style={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: colors.background
  },
});

export default ContactsView;
