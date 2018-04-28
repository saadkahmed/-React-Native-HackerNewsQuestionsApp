import React, { Component } from 'react';
import axios from 'axios';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import CommentDetail from './CommentDetail';

class CommentList extends Component {
    state = { list: [],
              tagfilter: ''
            };
//fetch the list of comments from API before list component first mounts
  componentWillMount() {
    // Get API Data and filter out the properties needed for the app
    axios.get('https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow')
  .then(response => this.setState({ list: this.getItems(response.data.items) }));
  }

//reconstruct API array with the useful properties
 getItems = (someArray) => {
    const p = new Date(Date()).getTime() / 1000 - 604800; // 7 days ago in unix timestamp

    let items = someArray.map((item) => {
      return { title: item.title,
               link: item.link,
               tags: item.tags,
               views: item.view_count,
               score: item.score,
               date: item.creation_date,
               image: item.owner.profile_image,
             };
        }
    );
    items = items.filter((item) => { return item.date > p; }); // filter old dates
    return items;
  }

  //sorting functions below
  sortscore = () => {
      this.setState(() => {
      return { list: this.state.list.sort((a, b) => {
        return b.score - a.score;
        })
      };
    });
  }
  sortdate = () => {
      this.setState(() => {
        return { list: this.state.list.sort((a, b) => {
          return b.date - a.date;
          })
        };
      });
    }
  sortviews = () => {
        this.setState(() => {
          return { list: this.state.list.sort((a, b) => {
            return b.view_count - a.view_count;
            })
          };
        });
      }

  filterByTags = () => {
    const { list, tagfilter } = this.state;

    this.setState(() => {
      return { list: list.filter(item => item.tags.includes(tagfilter.toLowerCase())) };
});
  }

 //re-render (refresh) the list
  reset = () => {
    axios.get('https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow')
  .then(response => this.setState({ list: this.getItems(response.data.items) }));
  }

  render() {
    return (
      <View>

        <View style={styles.statViewStyle}>
          <TouchableOpacity style={styles.filterButtonStyle} onPress={this.sortscore}>
            <Text>Sort by Votes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButtonStyle} onPress={this.sortdate}>
            <Text>Sort by Date</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statViewStyle}>
          <TouchableOpacity style={styles.filterButtonStyle} onPress={this.sortviews}>
            <Text>Sort by Popularity</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButtonStyle} onPress={this.reset}>
            <Text>Refresh</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.statViewStyle}>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, margin: 5 }}
              onChangeText={(text) => this.setState({ tagfilter: text })}
              value={this.state.tagfilter}
              placeholder={'Filter by Tags'}
            />
          <TouchableOpacity onPress={this.filterByTags}> <Text> Filter! </Text> </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.list}
          extraData={this.state} // re-reder when state changes
          renderItem={({ item }) => <CommentDetail comment={item} />}
        />
      </View>
    );
  }
}

const styles = {
  containerStyle: {
      borderBottomWidth: 1,
      padding: 3,
      backgroundColor: '#fff',
      justifyContent: 'flex-start',
      borderColor: '#ddd',
      position: 'relative'
  },
  statViewStyle: {
    height: 70,
    padding: 5,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  filterButtonStyle: {
    fontSize: 14,
    borderWidth: 1,
    padding: 5,
    margin: 2,
    borderRadius: 10,
  }
};

export default CommentList;
