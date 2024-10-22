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
    color: '#606060',
    fontWeight: 'normal'
  },
  tabTextSelected: {
    color: '#396593',
    fontWeight: 'normal'
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
    maxHeight: '70%',
    elevation: 15
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingTop: 5,
    paddingBottom: 15
  },
  text: {
    fontSize: 13,
    fontWeight: 'normal',
    color: 'black'
  },
  detailContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  verText: {
    // marginLeft: 5,
    fontSize: 10,
    fontWeight: 'normal',
    color: 'black'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
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
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black'
  },
  searchButton: {
    marginHorizontal: 10,
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
    height: '100%',
    width: '70%'
  },
  searchConfig: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 100,
    width: '10%'
  },
  inputBox: {
    height: '100%',
    width: '95%',
    fontSize: 15,
    color: 'black',
    marginBottom: -5,
    fontWeight: 'normal'
    //paddingLeft: 1,
  },
  label: {
    color: '#396593',
    fontSize: 14,
    marginTop: 0,
    fontWeight: 'normal'
    //marginRight: 170,
  }
});
