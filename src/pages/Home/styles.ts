import { styled } from "styled-components";
import { typography } from "../../styles/typography";

export const Hero = styled.div`
  position: relative;

  img#hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    max-height: 544px;
    width: 100vw;
    object-fit: cover;
  }
`;

export const HeroContent = styled.div`
  max-width: 1160px;
  padding: 92px 20px;
  margin: 0 auto;

  display: flex;
  gap: 56px;
  align-items: flex-start;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    gap: 66px;
  }
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  > h1 {
    ${typography.fonts.titleXL}
    color: ${({ theme }) => theme.colors["base-title"]};
  }

  > span { 
    ${typography.fonts.textL}
    color: ${({ theme }) => theme.colors["base-subtitle"]};
  }
`;