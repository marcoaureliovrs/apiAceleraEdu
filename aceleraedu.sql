-- phpMyAdmin SQL Dump
-- version 4.5.3.1
-- http://www.phpmyadmin.net
--
-- Host: aceleraedu.mysql.dbaas.com.br
-- Generation Time: 09-Mar-2017 às 17:11
-- Versão do servidor: 5.6.35-80.0-log
-- PHP Version: 5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `aceleraedu`
--
CREATE DATABASE IF NOT EXISTS `aceleraedu` DEFAULT CHARACTER SET latin1 COLLATE latin1_general_ci;
USE `aceleraedu`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_aula`
--

CREATE TABLE `tbl_aula` (
  `cod_aula` int(10) UNSIGNED NOT NULL,
  `fk_cod_materia` int(10) UNSIGNED DEFAULT NULL,
  `nome_aula` varchar(45) NOT NULL,
  `desc_aula` varchar(300) NOT NULL,
  `dependencia_aula` varchar(11) DEFAULT NULL,
  `url_video_aula` varchar(2000) NOT NULL,
  `url_doc_aula` varchar(2000) NOT NULL,
  `url_ppt_aula` varchar(2000) NOT NULL,
  `url_exerc_aula` varchar(2000) NOT NULL,
  `url_thumbnail` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tbl_aula`
--

INSERT INTO `tbl_aula` (`cod_aula`, `fk_cod_materia`, `nome_aula`, `desc_aula`, `dependencia_aula`, `url_video_aula`, `url_doc_aula`, `url_ppt_aula`, `url_exerc_aula`, `url_thumbnail`) VALUES
(1, 4, 'Aula Teste 01', 'Aula de teste cadastrada através do envio de um json pelo curl de Post', '2', 'http://aceleraedu.com.br/media/aula01.mp4', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aula01.png'),
(5, 1, 'Aula Teste 02', 'Aula de teste 02', NULL, 'http://aceleraedu.com.br/media/aula02.mp4', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aula02.png'),
(6, 1, 'Aula Teste 03', 'Aula de teste 03', NULL, 'http://aceleraedu.com.br/media/aula03.mp4', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aula03.png'),
(7, 1, 'Aula Teste 04', 'Aula de teste 04', NULL, 'http://aceleraedu.com.br/media/aula04.mp4', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aula04.png'),
(8, 1, 'Aula Teste 05', 'Aula de teste 05', NULL, 'http://aceleraedu.com.br/media/aula05.mp4', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aula05.png'),
(9, 1, 'Aula Teste 06', 'Aula de teste 06', NULL, 'http://aceleraedu.com.br/media/aula06.mp4', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aceleraedu.pdf', 'http://aceleraedu.com.br/media/aula06.png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_curso`
--

CREATE TABLE `tbl_curso` (
  `cod_curso` int(10) UNSIGNED NOT NULL,
  `nome_curso` varchar(100) NOT NULL,
  `desc_curso` varchar(500) NOT NULL,
  `valor_curso` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tbl_curso`
--

INSERT INTO `tbl_curso` (`cod_curso`, `nome_curso`, `desc_curso`, `valor_curso`) VALUES
(1, 'Pedagogia', 'Curso voltado a educa', 0),
(2, 'Sistemas de informação', 'Curso de Sistemas de informação composto por 8 semestres.', 0),
(3, 'Engenharia da Computação', 'Engenharia da Computação', 0),
(5, 'Redes', 'redes de computadores', 0),
(6, 'Meio Ambiente', 'Sustentabilidadee', 9.99),
(7, 'Banco de Dados', 'Curso de Banco de Dados', 0),
(8, 'Administração', 'Curso de Administração', 0),
(12, 'Curso deste automatizado', 'Inclusão de curso de teste.', 10),
(17, 'Curso deste automatizado2', 'Inclusão de curso de teste.', 10);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_curso_materia`
--

CREATE TABLE `tbl_curso_materia` (
  `fk_cod_curso_2` int(10) UNSIGNED NOT NULL,
  `fk_cod_materia_2` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_materia`
--

CREATE TABLE `tbl_materia` (
  `cod_materia` int(10) UNSIGNED NOT NULL,
  `cod_curso_relacionado` int(10) UNSIGNED NOT NULL,
  `nome_materia` varchar(45) NOT NULL,
  `desc_materia` varchar(300) NOT NULL,
  `dependencia_materia` int(11) NOT NULL,
  `semestre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tbl_materia`
--

INSERT INTO `tbl_materia` (`cod_materia`, `cod_curso_relacionado`, `nome_materia`, `desc_materia`, `dependencia_materia`, `semestre`) VALUES
(1, 1, 'Jogos e brincadeiras', 'Criação de jogos e brincadeiras infantis', 0, 0),
(2, 4, 'anatomia', 'hahahahsha', 0, 0),
(3, 3, 'Robótica', 'Nessa matéria o aluno irá aprender a como criar um robô', 0, 0),
(4, 3, 'Programação', 'Aula de programação ', 0, 0),
(5, 7, 'MySQL', 'Matéria inicial de MySQL', 0, 0),
(6, 8, 'Administração e Marketing', 'Administração na área de Marketing', 0, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `cod_usuario` int(10) UNSIGNED NOT NULL,
  `nome_usuario` varchar(50) NOT NULL,
  `cpf_usuario` varchar(15) DEFAULT NULL,
  `rg_usuario` varchar(15) DEFAULT NULL,
  `nasc_usuario` date NOT NULL,
  `sexo_usuario` varchar(10) NOT NULL,
  `email_usuario` varchar(100) NOT NULL,
  `senha_usuario` varchar(255) NOT NULL,
  `cod_nivel_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`cod_usuario`, `nome_usuario`, `cpf_usuario`, `rg_usuario`, `nasc_usuario`, `sexo_usuario`, `email_usuario`, `senha_usuario`, `cod_nivel_usuario`) VALUES
(1, 'Marco Gorak', NULL, NULL, '1969-12-31', '', 'marco.gorak@live.com', 'caf1a3dfb505ffed0d024130f58c5cfa', 4),
(2, 'Teste', NULL, NULL, '1994-03-08', '', 'teste01@aceleraedu.com', '202cb962ac59075b964b07152d234b70', 1),
(3, 'Usuário de Teste', '40672767890', NULL, '1992-07-26', 'Masculino', 'rafadolivs@gmail.com', '202cb962ac59075b964b07152d234b70', 1),
(4, 'Aluno Teste', NULL, NULL, '1969-12-31', '', 'alunoteste@aceleraedu.com.br', '202cb962ac59075b964b07152d234b70', 1),
(10, 'Usuário de Teste', '40672767880', NULL, '1992-07-26', 'Masculino', 'teste@aceleraedu.com.br', 'teste@123', 1),
(11, 'marco', NULL, NULL, '1969-12-31', '', 'marco.gorak@gmail.com', '202cb962ac59075b964b07152d234b70', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_usuario_curso`
--

CREATE TABLE `tbl_usuario_curso` (
  `fk_cod_usuario` int(10) UNSIGNED NOT NULL,
  `fk_cod_curso` int(10) UNSIGNED NOT NULL,
  `semestre` int(11) NOT NULL,
  `matricula` int(11) NOT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_aula`
--
ALTER TABLE `tbl_aula`
  ADD PRIMARY KEY (`cod_aula`),
  ADD UNIQUE KEY `Nome_Aula_UNIQUE` (`nome_aula`),
  ADD KEY `fk_Aula_Materia_idx` (`fk_cod_materia`);

--
-- Indexes for table `tbl_curso`
--
ALTER TABLE `tbl_curso`
  ADD PRIMARY KEY (`cod_curso`),
  ADD UNIQUE KEY `Nome_Curso_UNIQUE` (`nome_curso`);

--
-- Indexes for table `tbl_curso_materia`
--
ALTER TABLE `tbl_curso_materia`
  ADD PRIMARY KEY (`fk_cod_curso_2`,`fk_cod_materia_2`),
  ADD KEY `fk_Curso_Materia_Curso1_idx` (`fk_cod_curso_2`),
  ADD KEY `fk_Curso_Materia_Materia1_idx` (`fk_cod_materia_2`);

--
-- Indexes for table `tbl_materia`
--
ALTER TABLE `tbl_materia`
  ADD PRIMARY KEY (`cod_materia`),
  ADD UNIQUE KEY `Nome_Materia_UNIQUE` (`nome_materia`);

--
-- Indexes for table `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`cod_usuario`),
  ADD UNIQUE KEY `Cpf_Usuario_UNIQUE` (`cpf_usuario`),
  ADD UNIQUE KEY `Rg_Usuario_UNIQUE` (`rg_usuario`);

--
-- Indexes for table `tbl_usuario_curso`
--
ALTER TABLE `tbl_usuario_curso`
  ADD PRIMARY KEY (`matricula`,`fk_cod_usuario`,`fk_cod_curso`),
  ADD KEY `fk_Usuario_Curso_Usuario1_idx` (`fk_cod_usuario`),
  ADD KEY `fk_Usuario_Curso_Curso1_idx` (`fk_cod_curso`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_aula`
--
ALTER TABLE `tbl_aula`
  MODIFY `cod_aula` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `tbl_curso`
--
ALTER TABLE `tbl_curso`
  MODIFY `cod_curso` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `tbl_materia`
--
ALTER TABLE `tbl_materia`
  MODIFY `cod_materia` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `cod_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `tbl_usuario_curso`
--
ALTER TABLE `tbl_usuario_curso`
  MODIFY `matricula` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `tbl_aula`
--
ALTER TABLE `tbl_aula`
  ADD CONSTRAINT `fk_Aula_Materia` FOREIGN KEY (`fk_cod_materia`) REFERENCES `tbl_materia` (`cod_materia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tbl_curso_materia`
--
ALTER TABLE `tbl_curso_materia`
  ADD CONSTRAINT `fk_Curso_Materia_Curso1` FOREIGN KEY (`fk_cod_curso_2`) REFERENCES `tbl_curso` (`cod_curso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Curso_Materia_Materia1` FOREIGN KEY (`fk_cod_materia_2`) REFERENCES `tbl_materia` (`cod_materia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `tbl_usuario_curso`
--
ALTER TABLE `tbl_usuario_curso`
  ADD CONSTRAINT `fk_Usuario_Curso_Curso1` FOREIGN KEY (`fk_cod_curso`) REFERENCES `tbl_curso` (`cod_curso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Usuario_Curso_Usuario1` FOREIGN KEY (`fk_cod_usuario`) REFERENCES `tbl_usuario` (`cod_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
