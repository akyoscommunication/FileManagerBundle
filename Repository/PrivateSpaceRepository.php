<?php

namespace Akyos\FileManagerBundle\Repository;

use Akyos\FileManagerBundle\Entity\PrivateSpace;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method PrivateSpace|null find($id, $lockMode = null, $lockVersion = null)
 * @method PrivateSpace|null findOneBy(array $criteria, array $orderBy = null)
 * @method PrivateSpace[]    findAll()
 * @method PrivateSpace[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PrivateSpaceRepository extends ServiceEntityRepository
{
	public function __construct(ManagerRegistry $registry)
	{
		parent::__construct($registry, PrivateSpace::class);
	}

	// /**
	//  * @return PrivateSpace[] Returns an array of PrivateSpace objects
	//  */
	/*
	public function findByExampleField($value)
	{
		return $this->createQueryBuilder('p')
			->andWhere('p.exampleField = :val')
			->setParameter('val', $value)
			->orderBy('p.id', 'ASC')
			->setMaxResults(10)
			->getQuery()
			->getResult()
		;
	}
	*/

	/*
	public function findOneBySomeField($value): ?PrivateSpace
	{
		return $this->createQueryBuilder('p')
			->andWhere('p.exampleField = :val')
			->setParameter('val', $value)
			->getQuery()
			->getOneOrNullResult()
		;
	}
	*/
}
