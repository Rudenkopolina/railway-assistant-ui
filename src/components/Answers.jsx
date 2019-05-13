import React from 'react';
import { Table } from 'semantic-ui-react'
import axios from 'axios';

class Answer extends React.Component {
  state = {
    answers: [],
    isLoading: true,
  }

  componentWillMount() {
    const axiosInstance = axios.create({ baseURL: 'http://localhost:5000' });
    const config = {
      headers: {'Access-Control-Allow-Origin': 'http://127.0.0.1:3000' }
    }
    axiosInstance.get('/api/answers', config)
    .then(res => this.setState({ answers: res.data, isLoading: false }));
  }

  render() {
    console.log(this.state);
    const headers = ['id', 'answer', 'status'];
    if (this.state.isLoading) {
      return (
        <div className="header">
          Loading...
        </div>
      )
    }
    return (
      <div>
        <div className="header">
          HEADER
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {headers.map((item, index) => (
                <Table.HeaderCell key={index}>{item}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.state.answers.map(answer => (
            <Table.Row>
              <Table.Cell>{answer.id}</Table.Cell>
              <Table.Cell>{answer.text}</Table.Cell>
              <Table.Cell>created</Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Answer;
