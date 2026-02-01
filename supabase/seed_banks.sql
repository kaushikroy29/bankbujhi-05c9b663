-- Seed 15 Banks with real data
INSERT INTO banks (name, swift_code, established_year, headquarters, website_url, logo_url)
VALUES 
('BRAC Bank', 'BRACBDDH', 2001, 'Dhaka', 'https://www.bracbank.com', '/banks/brac-bank.png'),
('Dutch-Bangla Bank', 'DBBLBDDH', 1995, 'Dhaka', 'https://www.dutchbanglabank.com', '/banks/dbbl.png'),
('Eastern Bank', 'EBLBDDH', 1992, 'Dhaka', 'https://www.ebl.com.bd', '/banks/ebl.png'),
('The City Bank', 'CITIBDDH', 1983, 'Dhaka', 'https://www.thecitybank.com', '/banks/city-bank.png'),
('Standard Chartered Bangladesh', 'SCBLBDDH', 1948, 'Dhaka', 'https://www.sc.com/bd', '/banks/sc.png'),
('HSBC Bangladesh', 'HSBCBDDH', 1996, 'Dhaka', 'https://www.hsbc.com.bd', '/banks/hsbc.png'),
('Prime Bank', 'PRBLBDDH', 1995, 'Dhaka', 'https://www.primebank.com.bd', '/banks/prime-bank.png'),
('Islami Bank Bangladesh', 'IBBLBDDH', 1983, 'Dhaka', 'https://www.islamibankbd.com', '/banks/islami-bank.png'),
('Mutual Trust Bank', 'MTBLBDDH', 1999, 'Dhaka', 'https://www.mutualtrustbank.com', '/banks/mtb.png'),
('United Commercial Bank', 'UCBLBDDH', 1983, 'Dhaka', 'https://www.ucb.com.bd', '/banks/ucb.png'),
('NCC Bank', 'NCCBBDDH', 1993, 'Dhaka', 'https://www.nccbank.com.bd', '/banks/ncc.png'),
('Bank Asia', 'BBASBDDH', 1999, 'Dhaka', 'https://www.bankasia-bd.com', '/banks/bank-asia.png'),
('Southeast Bank', 'SEBLBDDH', 1995, 'Dhaka', 'https://www.southeastbank.com.bd', '/banks/southeast.png'),
('Pubali Bank', 'PUBABDDH', 1959, 'Dhaka', 'https://www.pubalibankbd.com', '/banks/pubali.png'),
('AB Bank', 'ABBLBDDH', 1982, 'Dhaka', 'https://abbl.com', '/banks/ab-bank.png')
ON CONFLICT (name) DO NOTHING;
