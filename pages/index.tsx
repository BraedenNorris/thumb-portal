import { Text, Button, Grid, Tooltip, Modal, Textarea, useInput, Card } from '@nextui-org/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import styles from '../styles/Home.module.css';
import abi from "../utils/ThumbPortal.json" 

const Home: NextPage = () => {
  const title = "👋 Hello there!";
  const thumbUp = "👍";
  const thumbDown = "👎";
  const contract = '0x1de56614b09671e86bf472d10a9b0ac2c7705a91';
  const contractABI = abi.abi;

  const [modalVisible, setModalVisible] = useState(false);
  const [orientation, setOrientation] = useState(0);

  const {
    value: message,
    setValue: setMessage,
    reset,
    bindings,
  } = useInput("");

  const getAllThumbs = useContractRead({
    addressOrName: contract,
    contractInterface: contractABI,
    functionName: 'getAllThumbs',
    watch: true,
  });

  const getTotalUp = useContractRead({
    addressOrName: contract,
    contractInterface: contractABI,
    functionName: 'getTotalUp',
    watch: true,
  });

  const getTotalDown = useContractRead({
    addressOrName: contract,
    contractInterface: contractABI,
    functionName: 'getTotalDown',
    watch: true,
  });

  const up = useContractWrite({
    addressOrName: contract,
    contractInterface: contractABI,
    functionName: 'up',
    args: message,
  });

  const down = useContractWrite({
    addressOrName: contract,
    contractInterface: contractABI,
    functionName: 'down',
    args: message,
  });
  const { isConnected } = useAccount();

  const handleVote = (orientation: number) => {
    setOrientation(orientation);
    setModalVisible(true);
  }

  const submitTransaction = () => {
    if (orientation === 1) {
      up.write();
    } else {
      down.write();
    }

    setMessage("");
    setModalVisible(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Thumb Portal</title>
        <meta
          name="description"
          content="The battle of thumbs on Rinkeby"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.button}>
          <ConnectButton />
        </div>

        <h1 className={styles.title}>
          {title}
        </h1>

        <p className={styles.description}>
          There is a battle between thumbs occuring on the Rinkeby testnet. Contribute to the battle by submitting a message and thumb!
        </p>

        {isConnected &&
        <div>
          <Grid.Container gap={2} justify="center">
            <Grid>
              <Tooltip content={getTotalUp.data?.toString() + ' vote(s)'} rounded color="primary" placement='left'>
                <Button size="xl" shadow css={{ fontSize: "$xl5", background: '$colors$upGradient'}} onClick={() => handleVote(1)}>{thumbUp}</Button>
              </Tooltip>
            </Grid>
            <Grid>
              <Tooltip content={getTotalDown.data?.toString() + ' vote(s)'} rounded color="primary" placement='right'>
                <Button size="xl" shadow css={{ fontSize: "$xl5", background: '$colors$downGradient'}} onClick={() => handleVote(0)}>{thumbDown}</Button>
              </Tooltip>
            </Grid>
          </Grid.Container>
        </div>
    }

        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={modalVisible}
          onClose={() => setModalVisible(false)}
        >
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Finalize vote
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Textarea placeholder='Please enter your message to be displayed on the blockchain here.' {...bindings} />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={() => setModalVisible(false)}>
              Cancel
            </Button>
            <Button auto onClick={submitTransaction}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Grid.Container gap={3} justify="center">
              {getAllThumbs.data?.map((thumb, index) => {
              return (
              <Grid key={index}>
                <Card isHoverable variant='bordered'>
                  <Card.Body>
                    <Text>{ parseInt(thumb.orientation) ? thumbUp : thumbDown }</Text>
                    <Text>Address: {thumb.sender}</Text>
                    <Text>Time: {new Date(thumb.timestamp * 1000)?.toString()}</Text>
                    <Text>Message: {thumb.message}</Text>
                  </Card.Body>
                </Card>
              </Grid>)
            })}
        </Grid.Container>
      
      </main>

      <footer className={styles.footer}>
        <Text>
          Created by
          <a href="https://github.com/BraedenNorris/thumb-portal" target="_blank" rel="noopener noreferrer"> Braeden Norris </a>
          with help from
          <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer"> rainbow </a>
          and 
          <a href="https://buildspace.so/" target="_blank" rel="noopener noreferrer"> buildspace.</a>
      </Text>
      </footer>
    </div>
  );
};

export default Home;
