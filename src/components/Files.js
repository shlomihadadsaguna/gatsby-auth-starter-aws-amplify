// import and configure a storage module in src/App.js
import  { Storage } from "aws-amplify";
Storage.configure({
  bucket: "shlomitest1",
  region: "us-east-1",
  identityPoolId: "us-east-1:516132f0-8056-4450-a1d5-fd4e6f877845"
});

// Import API module and graphqlOperation method from Amplify library, Connect component will be used to execute query or mutation
import { graphqlOperation, API } from "aws-amplify";
import { Connect } from "aws-amplify-react";
// Add our getObjects query to src/App.js
const getObjects = `query {
 getObjects {
  objectId
 }
}`;
// Add FileList class to iterate through an API query response
class FileList extends React.Component {
Files() {
    if (this.props.files.length != 0) {
      return this.props.files.map(file => (
        <List.Item key={file.objectId}>
          <List.Content as="a">
            {file.objectId}
          </List.Content>
        </List.Item>
      ));
    } else {
      return (
        <List.Item>
          <List.Content>Your filestore is empty</List.Content>
        </List.Item>
      );
    }
  }
  render() {
    return (
      <Segment>
        <List divided verticalAlign="middle">
          {this.Files()}
        </List>
      </Segment>
    );
  }
}
// Add FilesListLoader class that queries the API
class FilesListLoader extends React.Component {
render() {
    return (
        <Connect
          query={graphqlOperation(getObjects)}
        >
          {({ data, loading, errors }) => {
            if (loading) {
              return <div>Loading...</div>;
            }
            if (!data.getObjects) return;
            return <FileList files={data.getObjects} />;
          }}
        </Connect>
    );
  }
}
// Add FilesListLoader to our App
class App extends Component {
  signOut = async () => {
    await Auth.signOut();
    this.props.rerender();
  };
  render() {
    return (
      <Grid padded>
        <Grid.Column>
          <Menu>
            <Menu.Item>
              <S3Upload />
            </Menu.Item>
            <Menu.Item>
              <Button onClick={this.signOut}>Sign-out</Button>
            </Menu.Item>
          </Menu>
          <Segment>
            <Header as="h3">
              My Files
            </Header>
          </Segment>
          <FilesListLoader />
        </Grid.Column>
      </Grid>
    );
  }
}
