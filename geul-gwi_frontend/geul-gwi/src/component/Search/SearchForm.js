import React from 'react';
import styled from 'styled-components';

// Component
import TagSearchForm from 'component/Search/TagSearchForm'
import SearchResultForm from 'component/Search/SearchResultForm'

const SearchForm = () => {
   return (
      <Container>
         {/* 태그 검색 폼 */}
         <TagSearchForm />
         {/* 게시물 List */}
         <SearchResultForm />
      </Container>
   )
};

const Container = styled.div`
      flex - direction: row;
      width: 100 %;
      user - select: none;
`;

export default SearchForm;