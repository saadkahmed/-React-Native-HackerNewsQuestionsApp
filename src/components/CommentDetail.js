import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Button from './common/Button';


const AlbumDetail = ({ comment }) => {
  const { title, link, image, tags, views, score, date } = comment;

  const unixdateconvert = (unix_timestamp) => {
    const d = new Date(unix_timestamp*1000);
    timeStampCon = d.getDate() + '/' + (d.getMonth()) + '/' + d.getFullYear() + " " + d.getHours() + ':' + d.getMinutes();

    return timeStampCon;
  };

  const {
    headerTextStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    thumbnailStyle
  } = styles;

  return (
    <Card>
      <CardSection>
        <View style={thumbnailContainerStyle}>
          <Image
            style={thumbnailStyle}
            source={{ uri: image }}
          />
        </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{title}</Text>
          </View>
      </CardSection>
      <CardSection>
        <Text>Views: {views} </Text>
        <Text>Score: {score} </Text>
        <Text>date: {unixdateconvert(date)} </Text>
      </CardSection>

        <CardSection>
          <Button onPress={() => Linking.openURL(link)}>
            View Question
          </Button>
        </CardSection>

    </Card>

  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1
  },
  headerTextStyle: {
    flex: 0.7,
    fontSize: 14,
    margin: 5,
    flexWrap: 'wrap'
  },
  thumbnailStyle: {
    height: 70,
    width: 70
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    marginRight: 5

  },
  imageStyle: {
    height: 250,
    flex: 1,
    width: null
  }

};

export default AlbumDetail;
