import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ColorModeSwitcher } from '../components/mode'
import styles from '../styles/Home.module.css'
import { FormEvent, ChangeEvent, useState } from 'react';
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Text,
  Container,
  Flex,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from '@chakra-ui/icons';

export async function getServerSideProps(context:any) {
  console.log('context.query :>> ', context.query);
  const url = context.query ? `https://api.github.com/search/repositories?q=${context.query}` :"https://api.github.com/search/repositories";
  const token = { headers: { "Authorization": `token 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`,
                              "Accept": "application/vnd.github.v3+json" },
                  method: 'GET' };
  console.log('url ', url, 'token ', token);
  const res = await fetch(url, token);
  const data = await res.json();
  console.log('data :>> ', data);
  return { props: { data } }
}

const Home: NextPage = ({data:any}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Search Public Github Repositories</title>
        <meta name="description" content="Search for Public Github Repositories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Flex
        minH={'60vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Container
          maxW={'lg'}
          bg={useColorModeValue('white', 'whiteAlpha.100')}
          boxShadow={'xl'}
          rounded={'lg'}
          p={6}
        >
          <Heading
            as={'h2'}
            fontSize={{ base: 'xl', sm: '2xl' }}
            textAlign={'center'}
            mb={5}>
            Search the Github Repository
          </Heading>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            as={'form'}
            spacing={'12px'}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
            }}>
            <FormControl>
              <Input
                variant={'solid'}
                borderWidth={1}
                color={'gray.800'}
                _placeholder={{
                  color: 'gray.400',
                }}
                borderColor={useColorModeValue('gray.300', 'gray.700')}
                required
                value={search}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>{
                  setSearch(e.target.value);
                } }
                placeholder="example: reactlightbox , ......"
              />
            </FormControl>
            <FormControl w={{ base: '100%', md: '40%' }}>
              <Button
                colorScheme={'blue'}
                w="100%"
                type={'submit'}
                onClick={()=>{
                  router.push(`?q=${search}`)
                }}
                >
                {'Search'}
              </Button>
            </FormControl>
            <FormControl w={{ base: '100%', md: '40%' }}>
              <Button
                colorScheme={'blue'}
                w="100%"
                maxW={'80px'}
                type={'submit'}
                rightIcon={filter ? <ArrowDownIcon /> : <ArrowUpIcon />}
              >
                {'Filter'}
              </Button>
            </FormControl>
          </Stack>

        </Container>
      </Flex>

      <footer className={styles.footer}>
        
          Powered by{' '}
          <span className={styles.logo}>
            devgroves
          </span>
       
      </footer>
    </div>
  )
}

export default Home
