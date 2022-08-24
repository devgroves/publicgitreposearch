import type { GetServerSidePropsContext, GetStaticPropsContext, GetStaticPropsResult, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { FormEvent, ChangeEvent, useState, useRef, MutableRefObject, LegacyRef } from "react";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  VStack,
  Flex,
  Spacer,
  Container,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon } from "@chakra-ui/icons";
import RepoContainer from "../components/repoContainer";

type RepoItem = {
  id: string;
  name: string;
  full_name: string;
  languages_url: string;
  description: string;
  language: string;
  stars: number;
  watchers: number;
  forks: number;
  homepage: URL;
  topics: Array<string>;
  tags:URL;
  size:number;
  issue:number;
  contributors:URL;
  archived:Boolean;
  visibility:string;
  updated_at:string;
  license:string;
  owner:any;
  has_wiki:boolean;
};
type ContentPageProps = {
  repos: RepoItem[];
  searchText: string;
  count: number;
};

type QueryParams = {
  q: string;
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext<QueryParams>): Promise<GetStaticPropsResult<ContentPageProps>> => {
  console.log("context.query :>> ", query);
  if (!query || !query?.q) {
    return { props: { repos: [], searchText: "", count: 0 } };
  }
  const searchText: string = query.q[0];
  const url = `https://api.github.com/search/repositories?q=${query?.q}`;
  const token = {
    headers: {
      Authorization: `token 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`,
      Accept: "application/vnd.github.v3+json",
    },
    method: "GET",
  };
  const res = await fetch(url, token);
  const data = await res.json();
  // console.log('data :>> ', data);
  const repos: RepoItem[] = data.items.map((item: any) => {
    const repo = {
      id: item.id,
      language: item.language,
      name: item.name,
      full_name: item.full_name,
      description: item.description,
      stars: item.stargazers_count,
      watchers: item.watchers_count,
      forks: item.forks,
      homepage: item.homepage,
      topics: item.topics,
      tags: item.tags_url,
      size:item.size,
      issue: item.open_issues_count,
      contributors: item.contributors_url,
      archived: item.archived,
      visibility: item.visibility,
      updated_at: item.updated_at,
      license: item.license,
      owner: item.owner,
      has_wiki: item.has_wiki
    };
    return repo;
  });
  const results = { repos: repos, searchText: searchText, count: data.total_count || 0 };
  return { props: results };
};

const Home = ({ repos, searchText, count }: ContentPageProps): JSX.Element => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const router = useRouter();
  const el: MutableRefObject<HTMLInputElement | null> = useRef(null);
  console.log('searchText', searchText);

  return (
    <div className={styles.container}>
      <Head>
        <title>Search Public Github Repositories</title>
        <meta name="description" content="Search for Public Github Repositories" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Flex
        align={"center"}
        justify={"center"}
        // bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Container maxW={"lg"} bg={useColorModeValue("white", "whiteAlpha.100")} boxShadow={"xl"} rounded={"lg"} p={6}>
          <Heading as={"h2"} fontSize={{ base: "xl", sm: "2xl" }} textAlign={"center"} mb={5}>
            Search the Github Repository
          </Heading>
          <Stack
            direction={{ base: "column", md: "row" }}
            as={"form"}
            spacing={"12px"}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
            }}
          >
            <FormControl>
              <Input
                variant={"solid"}
                borderWidth={1}
                color={"gray.800"}
                _placeholder={{
                  color: "gray.400",
                }}
                borderColor={useColorModeValue("gray.300", "gray.700")}
                required
                value={search || searchText}
                ref={el}
                placeholder="example: reactlightbox , ......"
              />
            </FormControl>
            <FormControl w={{ base: "100%", md: "40%" }}>
              <Button
                colorScheme={"blue"}
                w="100%"
                type={"submit"}
                onClick={() => {
                  router.push(`?q=${el.current ? el.current.value : null}`);
                }}
              >
                {"Search"}
              </Button>
            </FormControl>
            <FormControl w={{ base: "100%", md: "40%" }}>
              <Button
                colorScheme={"blue"}
                w="100%"
                maxW={"80px"}
                type={"submit"}
                rightIcon={filter ? <ArrowDownIcon /> : <ArrowUpIcon />}
              >
                {"Filter"}
              </Button>
            </FormControl>
          </Stack>
        </Container>
      </Flex>

      <VStack>
        <Spacer />
        {repos && repos.map((repoItem: RepoItem) => <RepoContainer key={repoItem.id} repo={repoItem} />)}
      </VStack>

      <footer className={styles.footer}>
        Powered by <span className={styles.logo}>devgroves</span>
      </footer>
    </div>
  );
};

export default Home;
