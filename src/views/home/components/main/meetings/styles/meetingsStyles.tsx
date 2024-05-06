import {StyleSheet} from 'react-native';

export const meetingsStyles = StyleSheet.create({
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'transparent'
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#919191'
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: '#396593'
  },
  tabText: {
    fontSize: 16,
    color: '#606060'
  },
  tabTextSelected: {
    color: '#396593'
  },
  tabContent: {
    flex: 1
    // justifyContent: 'flex-start'
  },
  containerTable: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    marginTop: 30,
    height: 350,
    elevation: 15
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10
  },
  text: {
    fontSize: 13
  },
  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  verText: {
    // marginLeft: 5,
    fontSize: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#396593'
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  searchButton: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20
  },
  searchConfigIcon: {
    // marginLeft: 10,
    // marginRight: 10,
    // borderRadius: 20
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 20,
    height: 40,
    width: '70%'
  },
  searchConfig: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 100,
    height: 40,
    width: '10%'
  }
});
