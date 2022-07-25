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
import { ColorModeSwitcher } from './mode';

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://docs.github.com/en/rest/search#search-repositories`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: {data}  }
}
export default function Search({data}) {
  const [search, setSearch] = useState('')
  const [filter,setFilter]=useState(false)
  return (
    <Flex
      minH={'30vh'}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="example: reactlightbox , ......"
            />
          </FormControl>
          <FormControl w={{ base: '100%', md: '40%' }}>
            <Button
              colorScheme={'blue'}
              w="100%"
              type={'submit'}>
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
  );
}