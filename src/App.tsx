
import { Card, Col, Row, Tag } from 'antd';
import Pusher, { Channel } from 'pusher-js';
import { useEffect, useState } from "react";
import { Transaction } from './models/transaction.model';

export const App = () => {
  const [channel, setConnection] = useState<null | Channel>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [updates, setUpdates] = useState<number>(0);

  useEffect(() => {
    const pusher = new Pusher('9814904cb7007dd3a920', {
      cluster: 'us2',
    });
    const channel = pusher.subscribe('transactions');
    setConnection(channel)
  }, []);

  useEffect(() => {
    if (channel) {
      channel.bind('new', (data: any) => {
        let { message } = data;
        setTransactions(transactions => [...transactions, new Transaction(message.Id, message.Amount, message.Country, message.Partner, message.Date)])
      });
    }
  }, [channel]);

  useEffect(() => {
    if (channel) {
      channel.bind('update', (data: any) => {
        setUpdates(updates => updates + 1)
      });
    }
  }, [channel]);

  return (
    <>
      <header>
        <Card>
          <Row>
            <Col span={12}>
              <h1>Pusher Demo</h1>
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}>
              <h1>Transactions in progress: <strong>{transactions.length}</strong></h1>
            </Col>
            <Col span={6} style={{ textAlign: 'right' }}>
              <h1>Transactions updates: <strong>{updates}</strong></h1>
            </Col>
          </Row>
        </Card>
      </header>
      {transactions.map((transaction) =>
        <Card style={{ marginTop: 10, borderLeft: '5px solid #90caf9' }}>
          <Row>
            <Col span={6}>
              <h3><strong>Transaction ID:</strong> {transaction.id}</h3>
            </Col>
            <Col span={12}>
              <h3>
                <strong>Partner: </strong> {transaction.partner}
              </h3>
              <h3>
                <strong>Country: </strong> {transaction.country}
              </h3>
              <h3>
                <strong>Date: </strong> {transaction.date}
              </h3>
            </Col>
            <Col span={6}>
              <h3>Amount: {transaction.amount}</h3>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
}

export default App;
